import React from 'react';
import {Image, View, Text, StyleSheet} from 'react-native';

// Define a custom header component
const HappyPrimeHeader = () => (
  <View style={styles.container}>
    <Image
      source={require('../assets/VectorHappyPrimeLogo.png')}
      style={styles.icon}
    />
    <Text style={styles.title}>Happy Prime</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#202046',
  },
});

export default HappyPrimeHeader;
