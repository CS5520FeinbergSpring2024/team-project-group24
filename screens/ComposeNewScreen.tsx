import React, {Component} from 'react';
import {TextInput, StyleSheet, View, Dimensions} from 'react-native';
import BottomTaskBar from '../components/BottomTaskBar';
import DropDown from '../components/DropDown';

const screenHeight = Dimensions.get('window').height;

interface ComposeNewScreenState {
  textValue: string;
  isDropDownActive: boolean;
}

export default class ComposeNewScreen extends Component<
  {},
  ComposeNewScreenState
> {
  constructor(props: {}) {
    super(props);
    this.state = {
      textValue: '', // State to hold the value of the text input
      isDropDownActive: true,
    };
  }

  handleTextInputFocus = () => {
    // Shrink the dropdown when TextInput is focused
    this.setState({isDropDownActive: false});
  };

  render() {
    const {isDropDownActive} = this.state;
    return (
      <View style={styles.mainContainer}>
        <View
          style={[
            styles.dropDownContainer,
            isDropDownActive ? null : {flexGrow: 0},
          ]}>
          <DropDown />
        </View>
        {/* <DropDownSelection header={'How do you feel:'} /> */}
        <View style={styles.textBoxWrapper}>
          {/* I will ned to add multiline={true} then have the finish button exit out of keyboard*/}
          <TextInput
            style={styles.textBoxContainer}
            placeholder="Enter your message here"
            onChangeText={text => this.setState({textValue: text})}
            value={this.state.textValue}
            textAlignVertical="top"
            multiline={true}
            onFocus={this.handleTextInputFocus}
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
    flexGrow: 0,
    maxHeight: screenHeight / 3,
  },
  textBoxWrapper: {
    // height: screenHeight * 0.73,
    flexGrow: 1,
    marginTop: 12,
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
