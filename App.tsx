/* eslint-disable @typescript-eslint/no-unused-vars */
import {View, Text, SafeAreaView} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import AboutScreen from './screens/AboutScreen';
import React from 'react';
import HappyPrimeHeader from './components/HappyPrimeHeader';

export type RootStackParamList = {
  Home: undefined;
  About: undefined;
};

const headerComponent = () => <HappyPrimeHeader />;
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{headerTitle: headerComponent}}
        />
        <Stack.Screen name="About" component={AboutScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
