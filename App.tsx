import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Text } from 'react-native';
import Signup from './app/signup';
import Login from './app/login';
import Home from './app/home';
import Layout from './app/layout';
import MobileVerfiy from './app/mobileVerfiy';
import Sign_in from './authentication/sign_in';
import Sign_up from './authentication/sign_up';
import Callid from './app/callid';
import { CallScreen } from './src/CallScreen';
import MakeCalls from './app/makecalls';


const Stack = createStackNavigator();

const App = () => { 
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name="sign_in" component={Sign_in} options={{ headerShown: false }}/>
      <Stack.Screen name="sign_up" component={Sign_up} options={{ headerShown: false }}/>
      <Stack.Screen name="layout" component={Layout} options={{ headerShown: false }}/>
      {/* <Stack.Screen name="callid" component={Callid} options={{ headerShown: false }}/> */}
      <Stack.Screen name="CallScreen" component={CallScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="makecalls" component={MakeCalls} options={{ headerShown: false }}/>

      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;