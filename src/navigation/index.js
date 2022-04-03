import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import CallScreen from '../screens/CallScreen';
import CallingScreen from '../screens/CallingScreen';

import ContactScreen from '../screens/ContactScreen';
import IncomingCallScreen from '../screens/IncomingCallScreen';
import LoginScreen from '../screens/LoginScreen';

const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Contacts" component={ContactScreen} />

        <Stack.Group screenOptions={{headerShown: false}}>
          <Stack.Screen name="Call" component={CallScreen} />
          <Stack.Screen name="Calling" component={CallingScreen} />
          <Stack.Screen name="IncomingCall" component={IncomingCallScreen} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
