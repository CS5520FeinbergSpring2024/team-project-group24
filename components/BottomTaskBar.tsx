import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {PulseIndicator, BallIndicator} from 'react-native-indicators';
import {PermissionsAndroid} from 'react-native';

const screenHeight = Dimensions.get('window').height;

// const screenWidth = Dimensions.get('window').width;

const BottomTaskBar = ({
  recordActive,
  setRecordActive,
}: {
  recordActive: boolean;
  setRecordActive: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  // Handle permissions
  const handleRecordPress = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        {
          title: 'Microphone Permission',
          message: 'App needs access to your microphone to record audio.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Microphone permission granted');
        setRecordActive(true);
        console.log('Microphone active', recordActive);
        // Perform recording here
      } else {
        console.log('Microphone permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const handleFinishPress = async () => {
    setRecordActive(false);
  };

  return (
    <View style={[styles.mainContainer, styles.screenBottom]}>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={handleRecordPress}>
        <View style={styles.buttonContent}>
          <Image style={styles.image} source={require('../assets/mic.png')} />
          <Text style={styles.buttonText}>Record</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonContainer}>
        <View style={styles.buttonContent}>
          <Image
            style={styles.image}
            source={require('../assets/vocabulary.png')}
          />
          <Text style={styles.buttonText}>Cards</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonContainer}>
        <View style={styles.buttonContent}>
          <Image
            style={styles.image}
            source={require('../assets/keypad.png')}
          />
          <Text style={styles.buttonText}>Type</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={handleFinishPress}>
        {recordActive ? (
          <View style={styles.recordingIndicator}>
            <PulseIndicator color="#000000" />
          </View>
        ) : (
          <View style={styles.finishButton}>
            <Image
              style={styles.finishImage}
              source={require('../assets/check.png')}
            />
          </View>
        )}
        <Text style={styles.finishButtonText}>Finish</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonContainer}>
        <View style={styles.buttonContent}>
          <Image
            style={styles.image}
            source={require('../assets/save-outline.png')}
          />
          <Text style={styles.buttonText}>Saved</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonContainer}>
        <View style={styles.buttonContent}>
          <Image
            style={styles.image}
            source={require('../assets/rotate-ccw.png')}
          />
          <Text style={styles.buttonText}>Restore</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonContainer}>
        <View style={styles.buttonContent}>
          <Image style={styles.image} source={require('../assets/trash.png')} />
          <Text style={styles.buttonText}>Clear</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    borderColor: '#F7F7F7',
    borderWidth: 1,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: screenHeight * 0.11,
    paddingHorizontal: 5,
    paddingVertical: 12,
  },
  screenBottom: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  buttonContainer: {
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  buttonContent: {
    alignItems: 'center',
    width: 45,
  },
  image: {
    marginTop: 10,
    resizeMode: 'contain',
  },
  buttonText: {
    fontSize: 12,
    color: '#000000',
    marginTop: 15,
  },
  finishButton: {
    alignItems: 'center',
  },
  recordingIndicator: {
    paddingBottom: 10,
  },
  finishImage: {
    marginTop: 5,
    marginBottom: 15,
    resizeMode: 'contain',
  },
  finishButtonText: {
    fontSize: 12,
    color: '#000000',
    marginTop: 5,
    marginBottom: 6,
  },
});

export default BottomTaskBar;
