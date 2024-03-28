import React from 'react';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../App';

type NavigationProp = StackNavigationProp<RootStackParamList>;

interface NextSkipButtonsProp {
  screenToChangeTo: string;
  navigation: NavigationProp;
}

const NextSkipButtons: React.FC<NextSkipButtonsProp> = ({
  screenToChangeTo,
  navigation,
}) => {
  const goToNextScreen = () => {
    navigation.navigate(screenToChangeTo);
  };
  const skipScreenName = 'AssistanceScreen';
  const skipInformation = () => {
    navigation.navigate(skipScreenName);
  };
  return (
    <View style={[styles.buttonContainer, styles.screenBottom]}>
      <TouchableOpacity style={styles.continueButton} onPress={goToNextScreen}>
        <Text style={styles.continueText}>Next</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.skipButton} onPress={skipInformation}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  screenBottom: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  continueButton: {
    backgroundColor: '#000000',
    borderRadius: 40,
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  skipButton: {
    backgroundColor: '#FAFAFA',
    borderRadius: 40,
    paddingVertical: 15,
    paddingHorizontal: 20,
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

export default NextSkipButtons;
