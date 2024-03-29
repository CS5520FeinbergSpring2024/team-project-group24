import React, {Component} from 'react';
import {Text, TextInput, StyleSheet, View, Dimensions} from 'react-native';

const screenHeight = Dimensions.get('window').height;

const screenWidth = Dimensions.get('window').width;

export default class ComposeNewScreen extends Component {
  render() {
    return (
      <View style={styles.mainContainer}>
        <Text> This message is for:</Text>
        <Text> How do you feel:</Text>
        <TextInput style={styles.textBoxContainer} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  textBoxContainer: {
    backgroundColor: '#F7F7F7',
  },
});
