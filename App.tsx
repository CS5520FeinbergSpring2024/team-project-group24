/* eslint-disable @typescript-eslint/no-unused-vars */
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import SignUpScreen from './screens/SignUpScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import GenderScreen from './screens/GenderScreen';
import React from 'react';
import HappyPrimeHeader from './components/HappyPrimeHeader';
import HobbiesScreen from './screens/HobbiesScreen';
import HowCanIAssistYouScreen from './screens/HowCanIAssistYouScreen';
import ComposeNewScreen from './screens/ComposeNewScreen';

export type RootStackParamList = {
  Home: undefined;
  SignUp: undefined;
  Welcome: undefined;
  GenderScreen: undefined;
  HobbiesScreen: undefined;
  AssistanceScreen: undefined;
  ComposeNew: undefined;
};

const headerComponent = () => <HappyPrimeHeader />;
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar
        backgroundColor="#FFFFFF" // Set the background color of the status bar
        barStyle="dark-content" // Set the text color of the status bar (light or dark)
      />
      <Stack.Navigator initialRouteName="Home">
        {/* Home and Sign Up Screens */}
        <Stack.Group>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{headerTitle: headerComponent}}
          />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
        </Stack.Group>
        {/* Welcome and User Info Screens */}
        <Stack.Group>
          <Stack.Screen
            name="Welcome"
            component={WelcomeScreen}
            options={{headerTitle: '', headerLeft: () => null}}
          />
          <Stack.Screen
            name="GenderScreen"
            component={GenderScreen}
            options={{headerTitle: 'Gender Identity'}}
          />
          <Stack.Screen
            name="HobbiesScreen"
            component={HobbiesScreen}
            options={{headerTitle: 'Hobbies and Interests'}}
          />
        </Stack.Group>
        {/* Main Group */}
        <Stack.Group>
          <Stack.Screen
            name="AssistanceScreen"
            component={HowCanIAssistYouScreen}
            options={{headerTitle: '', headerLeft: () => null}}
          />
          <Stack.Screen
            name="ComposeNew"
            component={ComposeNewScreen}
            options={{headerTitle: 'Compose'}}
          />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
