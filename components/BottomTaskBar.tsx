import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';

const screenHeight = Dimensions.get('window').height;

// const screenWidth = Dimensions.get('window').width;

const BottomTaskBar = () => (
  <View style={[styles.mainContainer, styles.screenBottom]}>
    <TouchableOpacity style={styles.buttonContainer}>
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
        <Image style={styles.image} source={require('../assets/keypad.png')} />
        <Text style={styles.buttonText}>Type</Text>
      </View>
    </TouchableOpacity>
    <TouchableOpacity style={styles.buttonContainer}>
      <View style={styles.finishButton}>
        <Image
          style={styles.finishImage}
          source={require('../assets/check.png')}
        />
        <Text style={styles.finishButtonText}>Finish</Text>
      </View>
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
  finishImage: {
    marginTop: 5,
    resizeMode: 'contain',
  },
  finishButtonText: {
    fontSize: 12,
    color: '#000000',
    marginTop: 5,
    marginBottom: 5,
  },
});

export default BottomTaskBar;
