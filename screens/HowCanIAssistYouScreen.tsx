import React from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../App';

const screenHeight = Dimensions.get('window').height;

const screenWidth = Dimensions.get('window').width;

type NavigationProp = StackNavigationProp<RootStackParamList, 'ComposeNew'>;

interface Props {
  navigation: NavigationProp;
}

const HowCanIAssistYouScreen: React.FC<Props> = ({navigation}) => {
  const goToComposeNewScreen = () => {
    navigation.navigate('ComposeNew');
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.topContainer}>
        <Text style={styles.userHeaderText}>Good Day User!</Text>
        <Text style={styles.bodyText}>How can I assist you?</Text>
      </View>
      <View style={styles.overlayContainer}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.composeNewButtonCard}
            onPress={goToComposeNewScreen}>
            <Image source={require('../assets/Vectorplus.png')} />
            <Text style={styles.composeNewText}>Compose New</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.myVocabButtonCard}
            onPress={() => console.log('Button pressed')}>
            <Image source={require('../assets/vocabulary.png')} />
            <Text style={styles.myVocabText}>My Vocabulary</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.bottomContainer} />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  topContainer: {
    flex: 2,
    backgroundColor: '#E7E7E7',
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  userHeaderText: {
    color: '#000000',
    fontSize: 20,
  },
  bodyText: {
    color: '#000000',
    fontSize: 35,
    paddingTop: 10,
  },
  overlayContainer: {
    ...StyleSheet.absoluteFillObject, // Takes up the entire screen
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    position: 'absolute',
    left: 10,
    right: 10,
    paddingBottom: 95,
  },
  composeNewButtonCard: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
    height: screenHeight * 0.2,
    width: screenWidth * 0.4,
    borderRadius: 30,
    zIndex: 1,
  },
  composeNewText: {
    color: '#FFFFFF',
    fontSize: 18,
    paddingTop: 10,
  },
  myVocabButtonCard: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#BCBCBC',
    borderWidth: 1,
    height: screenHeight * 0.2,
    width: screenWidth * 0.4,
    borderRadius: 30,
    zIndex: 1,
  },
  myVocabText: {
    color: '#000000',
    fontSize: 18,
    paddingTop: 4,
  },
  bottomContainer: {
    flex: 3,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HowCanIAssistYouScreen;
