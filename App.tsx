/* eslint-disable @typescript-eslint/no-unused-vars */
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import SignUpScreen from './screens/SignUpScreen';
import React from 'react';
import HappyPrimeHeader from './components/HappyPrimeHeader';

export type RootStackParamList = {
  Home: undefined;
  SignUp: undefined;
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
