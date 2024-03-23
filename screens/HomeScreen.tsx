import React from 'react';
import {
  Dimensions,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../App';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

interface Props {
  navigation: HomeScreenNavigationProp;
}

const screenHeight = Dimensions.get('window').height;

const HomeScreen: React.FC<Props> = ({navigation}) => {
  const goToSignUp = () => {
    navigation.navigate('SignUp');
  };

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Image
          source={require('../assets/VenDiagram.png')} // Provide the source of your image
          style={styles.image}
        />
      </View>
      <View style={styles.bottomContainer}>
        <Text style={styles.titleText}>Speak Ease</Text>
        <Text style={styles.text}>
          Lorem ipsum dolor sit amet consectetur. Integer blandit purus integer
          venenatis condimentum ac magna interdum. Aliquet ut varius tellus et.
          Id proin vitae tempus risus dis. Vitae ut phasellus facilisis neque
          est quis neque enim.
        </Text>
        <TouchableOpacity style={styles.buttonContainer} onPress={goToSignUp}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topContainer: {
    flex: 2,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '70%',
    height: '70%',
    resizeMode: 'contain',
  },
  bottomContainer: {
    flex: 3,
    backgroundColor: '#FAFAFA',
    justifyContent: 'flex-start',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  titleText: {
    fontSize: 30,
    marginBottom: 10,
    color: '#000000',
    fontWeight: 'bold',
  },
  text: {
    fontSize: 22,
    marginTop: screenHeight * 0.03,
    color: '#000000',
    marginBottom: 10,
  },
  buttonContainer: {
    backgroundColor: '#000000',
    borderRadius: 40,
    marginTop: screenHeight * 0.13,
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
  },
});

export default HomeScreen;
