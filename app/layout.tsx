import { StyleSheet, Text, View, SafeAreaView, Image } from 'react-native';
import React, { useState } from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../src/HomeScreen';
import { CallScreen } from '../src/CallScreen';
import LinearGradient from 'react-native-linear-gradient';
import tw from 'tailwind-react-native-classnames';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Import Stream Video SDK
import { StreamVideo, StreamVideoClient } from '@stream-io/video-react-native-sdk';
import MakeCalls from './makecalls';

// Stream API settings
const apiKey = 'Your API_key';
const token = 'Your_Token';
const userId = 'John_Smith';
const user = {
  id: userId,
  name: 'John Malkovich',
  image: `https://getstream.io/random_png/?id=${userId}&name=John+Malkovich`,
};

const client = new StreamVideoClient({ apiKey, user, token });



const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <StreamVideo client={client}>
      <LinearGradient colors={['#42275a', '#734b6d']} style={[tw`flex-1`]}>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarStyle: route.name === 'Join Call' ? { display: 'none' } : {
              backgroundColor: 'transparent',
              borderTopWidth: 0,
              elevation: 0,
            },
            tabBarBackground: () => (
              <LinearGradient colors={['#614385', '#734b6d']} style={{ flex: 1 }} />
            ),
          })}
        >
          <Tab.Screen 
            name="All Calls" 
            component={HomeScreen}
            options={{
              tabBarIcon: () => (
                <Image
                  source={require('../assets/telephone.png')}
                  style={{ width: 24, height: 24 }}
                />
              ),
            }}
          />
          <Tab.Screen 
            name="Start a new call" 
            component={MakeCalls}
            options={{
              tabBarIcon: () => (
                <View style={{ position: 'absolute' }}>
                  <Image
                    source={require('../assets/add.png')}
                    style={{ width: 24, height: 24 }}
                  />
                </View>
              ),
            }}
          />
          <Tab.Screen 
            name="Join Call" 
            component={CallScreen}
            options={{
              tabBarIcon: () => (
                <Image
                  source={require('../assets/exit.png')}
                  style={{ width: 24, height: 24 }}
                />
              ),
            }}
          />
        </Tab.Navigator>
      </LinearGradient>
    </StreamVideo>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
  },
});
