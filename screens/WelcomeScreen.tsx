import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../App';

const screenHeight = Dimensions.get('window').height;

type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Welcome'
>;

interface Props {
  navigation: HomeScreenNavigationProp;
}

const WelcomeScreen: React.FC<Props> = ({navigation}) => {
  const goToNextScreen = () => {
    navigation.navigate('GenderScreen');
  };
  const goToMainScreen = () => {
    navigation.navigate('AssistanceScreen');
  };
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.headerText}>Welcome User!</Text>
      <View style={styles.imageContainer}>
        <Image
          source={require('../assets/welcomeScreen.png')}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
      <Text style={styles.bodyText}>Tell me about yourself</Text>
      <Text style={styles.bodyText}>
        It will help us build better conversation suggestions
      </Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.continueButton}
          onPress={goToNextScreen}>
          <Text style={styles.continueText}>Continue</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.skipButton} onPress={goToMainScreen}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>
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
  headerText: {
    fontSize: 20,
    color: '#000000',
    fontWeight: 'bold',
  },
  bodyText: {
    fontSize: 28,
    color: '#000000',
    fontWeight: 'bold',
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 1,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: screenHeight * 0.2,
  },
  continueButton: {
    backgroundColor: '#000000',
    borderRadius: 40,
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  skipButton: {
    backgroundColor: '#FAFAFA',
    borderRadius: 40,
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  continueText: {
    color: '#ffffff',
    fontSize: 18,
    padding: 2,
    paddingHorizontal: 30,
  },
  skipText: {
    color: '#000000',
    fontSize: 18,
    padding: 2,
    paddingHorizontal: 30,
  },
});

export default WelcomeScreen;
