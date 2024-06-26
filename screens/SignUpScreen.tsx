import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  Dimensions,
  ToastAndroid,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../App';
import CountryPicker, {Country} from 'react-native-country-picker-modal';
// import RNPasswordStrengthMeter from 'react-native-password-strength-meter';
import SQLite from 'react-native-sqlite-storage';

//connect to db
const db = SQLite.openDatabase(
  {
    name: 'SpeakEaseDB',
    location: 'default',
  },
  () => {
    console.log('Database opened successfully in SignUp');
  },
  error => {
    console.log(error);
  },
);

const screenHeight = Dimensions.get('window').height;

type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'SignUp'
>;

interface Props {
  navigation: HomeScreenNavigationProp;
}

// This is the logic so I can add a login button on the top right of the screen
const LoginButton: React.FC<{navigation: HomeScreenNavigationProp}> = ({
  navigation,
}) => (
  <TouchableOpacity
    style={styles.loginButton}
    onPress={() => navigation.navigate('LoginScreen')}>
    <Text style={styles.loginButtonText}>Login</Text>
  </TouchableOpacity>
);

const SignUpScreen: React.FC<Props> = ({navigation}) => {
  // Assign navigation outside of useEffect, otherwise it will cause error
  const loginButton = () => <LoginButton navigation={navigation} />;
  // Assigns login button to the header of the screen
  useEffect(() => {
    navigation.setOptions({
      headerRight: loginButton,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation]);

  useEffect(() => {
    // getData();
    createTable();
  }, []);

  const createTable = () => {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS Users' +
          '(ID INTEGER PRIMARY KEY AUTOINCREMENT, Name TEXT NOT NULL, Email TEXT, Phone NUMBER);',
      );
    });
  };

  // useStates handle the selection of area code flag and number
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

  const [fullName, setFullName] = useState('');

  const [email, setEmail] = useState('');

  const [phone, setPhone] = useState('');

  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country);
  };
  const goToWelcome = () => {
    navigation.navigate('Welcome');
  };

  const handleSubmit = async () => {
    // Handles the submission for user sign up
    // used Gemini to help fix issue of states not updating. Needed to add check logic in this method
    const isValidName =
      /^[A-Za-z\s-]+$/.test(fullName) &&
      (fullName.match(/ /g) || []).length <= 1 &&
      (fullName.match(/-/g) || []).length <= 2;
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const isValidPhone =
      phone.length === 0 || (phone.length === 10 && /^\d+$/.test(phone));

    if (isValidName && isValidEmail && isValidPhone) {
      // If information is valid insert into SQLite db.
      try {
        await db.transaction(async tx => {
          await tx.executeSql(
            'INSERT INTO Users (Name, Email, Phone) VALUES (?,?,?)',
            [fullName, email, phone],
          );
        });
        console.log('Sign in successful!');
        console.log('Full Name:', fullName);
        console.log('Email:', email);
        console.log('Phone: ', phone);
        goToWelcome();
      } catch (error) {
        console.log(error);
        ToastAndroid.show('User already exists', ToastAndroid.SHORT);
      }
    } else {
      ToastAndroid.show('Invalid Sign Up Information', ToastAndroid.SHORT);
    }
  };

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.titleText}>Sign Up</Text>
      {/* Name Entry */}
      <View style={styles.informationContainer}>
        <Text style={styles.descriptionText}>Full Name</Text>
        <View style={styles.infoContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            placeholderTextColor="#63625E"
            onChangeText={text => {
              setFullName(text);
            }}
            value={fullName}
          />
          <Image
            source={require('../assets/mic-outline.png')}
            style={styles.image}
          />
        </View>
        {/* Email Entry */}
        <Text style={styles.descriptionText}>Email</Text>
        <View style={styles.infoContainer}>
          <Image
            source={require('../assets/mail-outlinemailIcon.png')}
            style={[styles.image, styles.iconMargin]}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            placeholderTextColor="#63625E"
            onChangeText={text => {
              setEmail(text);
            }}
          />
          <Image
            source={require('../assets/mic-outline.png')}
            style={styles.image}
          />
        </View>
        {/* This segment handles the phone number entry. Uses a library to show flags and area codes */}
        <Text style={styles.descriptionText}>Phone number (optional)</Text>
        <View style={styles.phoneContainer}>
          <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
            <View style={styles.countryCodeContainer}>
              <CountryPicker
                {...{
                  countryCode: selectedCountry ? selectedCountry.cca2 : 'CA',
                  withFlag: true,
                  withFilter: true,
                  withCallingCode: true,
                  onSelect: handleCountrySelect,
                }}
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
              />
              <Text style={styles.countryCodeText}>
                {selectedCountry ? `+${selectedCountry.callingCode}` : '+1'}
              </Text>
              <Image source={require('../assets/down.png')} />
            </View>
          </TouchableOpacity>
          <View style={styles.phoneNumberContainer}>
            <TextInput
              style={styles.input}
              placeholder="(000) 000 000"
              placeholderTextColor="#63625E"
              keyboardType="numeric"
              onChangeText={text => {
                setPhone(text);
              }}
              maxLength={10}
            />
          </View>
        </View>
        {/* Password Entry */}
        <Text style={styles.descriptionText}>Create password</Text>
        <View style={styles.infoContainer}>
          <Image
            source={require('../assets/lock-closed-outlinelockSymbol.png')}
            style={[styles.image, styles.iconMargin]}
          />
          <TextInput
            style={styles.input}
            placeholder="Create password"
            placeholderTextColor="#63625E"
          />
        </View>
      </View>
      <TouchableOpacity style={styles.buttonContainer} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  titleText: {
    fontSize: 22,
    marginBottom: 10,
    color: '#000000',
    fontWeight: 'bold',
  },
  informationContainer: {
    paddingVertical: 16,
  },
  descriptionText: {
    marginBottom: 10,
    fontSize: 14,
    color: '#50595B',
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
    borderRadius: 5,
    padding: 2,
    paddingHorizontal: 20,
    marginBottom: 14,
  },
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  countryCodeContainer: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
    borderRadius: 5,
    padding: 13,
    paddingHorizontal: 10,
    marginBottom: 14,
  },
  countryCodeText: {
    fontSize: 16,
    marginRight: 10,
    color: '#000000',
  },
  phoneNumberContainer: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    marginLeft: 20,
    borderRadius: 5,
    padding: 2,
    paddingHorizontal: 20,
    marginBottom: 14,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#000000',
  },
  image: {
    width: 24,
    height: 24,
  },
  iconMargin: {
    marginRight: 10, // Add margin to the right of the icon for spacing
  },
  buttonContainer: {
    backgroundColor: '#000000',
    borderRadius: 40,
    marginTop: screenHeight * 0.25,
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
  },
  invalidInput: {
    borderColor: 'red', // Change border color for invalid input
  },
  loginButton: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    marginRight: 20,
    borderRadius: 5,
  },
  loginButtonText: {
    color: '#000000',
    fontSize: 20,
  },
});

export default SignUpScreen;
