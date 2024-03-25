import React from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';

const screenHeight = Dimensions.get('window').height;

// Define a custom header component
const NextSkipButtons = screenToChangeTo => (
  <View style={styles.buttonContainer}>
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        style={styles.continueButton}
        onPress={screenToChangeTo}>
        <Text style={styles.continueText}>Continue</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.skipButton} onPress={screenToChangeTo}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
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

export default NextSkipButtons;
