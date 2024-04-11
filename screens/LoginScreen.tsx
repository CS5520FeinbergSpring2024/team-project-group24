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
import SQLite from 'react-native-sqlite-storage';

const screenHeight = Dimensions.get('window').height;

const db = SQLite.openDatabase(
  {
    name: 'SpeakEaseDB',
    location: 'default',
  },
  () => {
    console.log('Database opened successfully');
  },
  error => {
    console.log(error);
  },
);

type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'LoginScreen'
>;

interface Props {
  navigation: HomeScreenNavigationProp;
}

const LoginScreen: React.FC<Props> = ({navigation}) => {
  const [email, setEmail] = useState('');
  // useStates handle the selection of area code flag and number
  const goToWelcome = () => {
    navigation.navigate('Welcome');
  };

  const handleSubmit = async () => {
    // Create SQL query to select the User who's email matches
    // an existing email in the DB
    try {
      const result = await new Promise((resolve, reject) => {
        db.transaction(tx => {
          tx.executeSql(
            'SELECT * FROM Users WHERE Email = ?',
            [email],
            (_, {rows}) => {
              resolve(rows);
            },
            (_, error) => {
              reject(error);
              return false;
            },
          );
        });
      });

      if (result.length > 0) {
        // Email found in database
        console.log('Login successful');
        goToWelcome(); // Navigate to the welcome screen
      } else {
        // Email not found in database
        console.log('Email not found');
        ToastAndroid.show('Invalid email or password', ToastAndroid.SHORT);
      }
    } catch (error) {
      console.error('Error querying database:', error);
      ToastAndroid.show('Error querying database', ToastAndroid.SHORT);
    }
  };

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.titleText}>Log In</Text>
      {/* Email Entry */}
      <View style={styles.informationContainer}>
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
        {/* Password Entry */}
        <Text style={styles.descriptionText}>Password</Text>
        <View style={styles.infoContainer}>
          <Image
            source={require('../assets/lock-closed-outlinelockSymbol.png')}
            style={[styles.image, styles.iconMargin]}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter password"
            placeholderTextColor="#63625E"
          />
        </View>
      </View>
      <TouchableOpacity style={styles.buttonContainer} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Log In</Text>
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
    marginTop: screenHeight * 0.48,
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

export default LoginScreen;
