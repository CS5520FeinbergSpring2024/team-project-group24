import React, {Component} from 'react';
import {Text, TextInput, StyleSheet, View, Dimensions} from 'react-native';
import BottomTaskBar from '../components/BottomTaskBar';
import DropDownSelection from '../components/DropDownSelection';
import DropDown from '../components/DropDown';

const screenHeight = Dimensions.get('window').height;

const screenWidth = Dimensions.get('window').width;

export default class ComposeNewScreen extends Component {
  state = {
    isDropDownActive: false,
  };

  toggleDropDown = () => {
    this.setState(prevState => ({
      isDropDownActive: !prevState.isDropDownActive,
    }));
  };

  render() {
    const {isDropDownActive} = this.state;

    return (
      <View style={styles.mainContainer}>
        <View style={styles.dropDownContainer}>
          <DropDown />
        </View>
        {/* <DropDownSelection header={'How do you feel:'} /> */}
        <View style={styles.textBoxWrapper}>
          {/* I will ned to add multiline={true} then have the finish button exit out of keyboard*/}
          <TextInput
            style={styles.textBoxContainer}
            textAlignVertical="top"
            multiline={true}
          />
        </View>
        <View style={styles.bottomPadding} />
        <BottomTaskBar />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#FFFFFF',
  },
  dropDownContainer: {
    flexGrow: 1,
  },
  textBoxWrapper: {
    // height: screenHeight * 0.73,
    flexGrow: 1,
    marginTop: 20,
    marginHorizontal: 12,
    marginBottom: 20,
  },
  textBoxContainer: {
    flexGrow: 1,
    alignItems: 'flex-start',
    backgroundColor: '#F7F7F7',
    borderRadius: 10,
    padding: 10,
    textAlignVertical: 'top',
  },
  bottomPadding: {
    height: screenHeight * 0.1,
  },
});
