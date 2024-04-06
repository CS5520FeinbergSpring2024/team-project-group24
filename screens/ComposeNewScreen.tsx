import React, {Component, RefObject, useState} from 'react';
import {
  Text,
  TextInput,
  StyleSheet,
  View,
  Dimensions,
  Keyboard,
} from 'react-native';
import BottomTaskBar from '../components/BottomTaskBar';
import DropDown from '../components/DropDown';

const screenHeight = Dimensions.get('window').height;

interface ComposeNewScreenState {
  textValue: string;
  isDropDownActive: boolean;
  recordActive: boolean;
  results: any[];
}

export default class ComposeNewScreen extends Component<
  {},
  ComposeNewScreenState
> {
  private textInputRef: RefObject<TextInput>;

  constructor(props: {}) {
    super(props);
    this.state = {
      textValue: '', // State to hold the value of the text input
      isDropDownActive: true,
      recordActive: false,
      results: [],
    };
    this.textInputRef = React.createRef<TextInput>();
  }

  handleTextInputFocus = () => {
    // Shrink the dropdown when TextInput is focused
    this.setState({isDropDownActive: false});
  };

  handleSetRecordActive = (
    value: boolean | ((prevState: boolean) => boolean),
  ) => {
    if (typeof value === 'boolean') {
      // If value is boolean, update recordActive directly
      this.setState({recordActive: value}, () => {
        // After updating state, dismiss the keyboard if recordActive is true
        if (this.state.recordActive) {
          Keyboard.dismiss();
        }
      });
    } else {
      // If value is a function, use functional update to update recordActive
      this.setState(
        prevState => ({
          recordActive: value(prevState.recordActive),
        }),
        () => {
          // After updating state, dismiss the keyboard if recordActive is true
          if (this.state.recordActive) {
            Keyboard.dismiss();
          }
        },
      );
    }
  };
  render() {
    const {isDropDownActive, recordActive} = this.state;
    const {results, setResults} = this.state;
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
          {/* {recordActive && (
            <View style={styles.textBoxContainer}>
              {results?.map((result, index) => (
                <Text key={index}>{result}</Text>
              ))}
            </View>
          )} */}
          <TextInput
            ref={this.textInputRef}
            style={styles.textBoxContainer}
            placeholder="Enter your message here"
            value={results || this.state.textValue}
            onChangeText={text => {
              if (recordActive) {
                // If recordActive is true, update the results state instead of textValue
                setResults([text]);
              } else {
                // If recordActive is false, update the textValue state
                this.setState({textValue: text});
              }
            }}
            textAlignVertical="top"
            multiline={true}
            onFocus={this.handleTextInputFocus}
          />
        </View>
        <View style={styles.bottomPadding} />
        <BottomTaskBar
          recordActive={recordActive}
          setRecordActive={this.handleSetRecordActive}
          results={results}
          setResults={(newResults: any[]) =>
            this.setState({results: newResults})
          }
        />
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
