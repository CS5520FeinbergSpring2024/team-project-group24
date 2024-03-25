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

export type RootStackParamList = {
  Home: undefined;
  SignUp: undefined;
  Welcome: undefined;
  GenderScreen: undefined;
  HobbiesScreen: undefined;
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
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{headerTitle: headerComponent}}
        />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
