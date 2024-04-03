import React, {Component, RefObject} from 'react';
import {TextInput, StyleSheet, View, Dimensions, Keyboard} from 'react-native';
import BottomTaskBar from '../components/BottomTaskBar';
import DropDown from '../components/DropDown';

const screenHeight = Dimensions.get('window').height;

interface ComposeNewScreenState {
  textValue: string;
  isDropDownActive: boolean;
  recordActive: boolean;
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

  // componentDidMount() {
  //   console.log(this.state.recordActive);
  //   // Focus on TextInput when recordActive is true
  //   if (this.state.recordActive && this.textInputRef.current) {
  //     console.log('componentDidMount got called');
  //     // On Android, focus without showing the keyboard
  //     this.textInputRef.current.blur();
  //   }
  // }

  // componentDidUpdate(prevProps: {}, prevState: ComposeNewScreenState) {
  //   // Check if recordActive has changed from false to true
  //   if (
  //     !prevState.recordActive &&
  //     this.state.recordActive &&
  //     this.textInputRef.current
  //   ) {
  //     // On Android, focus without showing the keyboard
  //     this.textInputRef.current.blur();
  //   }
  // }

  render() {
    const {isDropDownActive, recordActive} = this.state;
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
            ref={this.textInputRef}
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
        <BottomTaskBar
          recordActive={recordActive}
          setRecordActive={this.handleSetRecordActive}
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
