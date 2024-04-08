import React, {useState} from 'react';
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

const screenHeight = Dimensions.get('window').height;

type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'SignUp'
>;

interface Props {
  navigation: HomeScreenNavigationProp;
}

const SignUpScreen: React.FC<Props> = ({navigation}) => {
  // useStates handle the selection of area code flag and number
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

  const [fullName, setFullName] = useState('');
  const [isValidFullName, setIsValidFullName] = useState(true);

  const [email, setEmail] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true);

  const handleFullNameChange = (text: string) => {
    const regex = /^[A-Za-z\s\-]+$/;

    if (regex.test(text) || text === '') {
      setFullName(text);
      setIsValidFullName(true); // Set full name as valid
    } else {
      setIsValidFullName(false); // Set full name as invalid
      showToast(); // Display toast for invalid full name
    }
  };

  const handleEmailChange = (text: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (regex.test(text) || text === '') {
      setEmail(text);
      setIsValidEmail(true); // Set email as valid
    } else {
      setIsValidEmail(false); // Set email as invalid
    }
  };

  const showToast = () => {
    ToastAndroid.show('Invalid Sign Up information!', ToastAndroid.SHORT);
  };

  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country);
  };
  const goToWelcome = () => {
    navigation.navigate('Welcome');
  };

  const handleSubmit = () => {
    if (!isValidEmail || !isValidFullName) {
      showToast();
    } else {
      // Submit logic if email is valid
      goToWelcome();
      console.log('Email:', email);
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
            style={[styles.input, !isValidFullName && styles.invalidInput]}
            placeholder="Enter your name"
            placeholderTextColor="#63625E"
            onChangeText={handleFullNameChange}
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
            onChangeText={handleEmailChange}
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
});

export default SignUpScreen;
