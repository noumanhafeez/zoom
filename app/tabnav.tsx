import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Text, View, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import tw from 'tailwind-react-native-classnames';
import { API_KEY } from '@env';
import {
  StreamCall,
  StreamVideo,
  StreamVideoClient,
  User,
} from '@stream-io/video-react-native-sdk';

import Callid from './callid';

const Tab = createBottomTabNavigator();



const AllCallsScreen = () => (
  <LinearGradient
    colors={['#42275a', '#734b6d']}
    style={[tw`flex-1`]}
  >
    <View style={styles.container}>
      <Text>All Calls</Text>
    </View>
  </LinearGradient>
);


const JoinCallsScreen = () => (
  <View style={styles.container}>
    <Text>Join Calls</Text>
  </View>
);








const Layout = () => {
  
  return (
    <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarStyle: route.name === 'Start a new Call' ? { display: 'none' } : { backgroundColor: 'transparent', borderTopWidth: 0, elevation: 0 },
      tabBarBackground: () => (
        <LinearGradient
          colors={['#614385', '#734b6d']}
          style={{ flex: 1 }}
        />
      ),
    })}
  >
      <Tab.Screen
        name="All Calls"
        component={AllCallsScreen}
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
        name="Start a new Call"
        component={Callid}
        options={{
          tabBarIcon: () => {
            return(
              <View style={{
                position:'absolute',
                
              }}>
              <Image
              source={require('../assets/add.png')}
              style={{ width: 24, height: 24 }}
            />
            </View>
            )
          }

        }}
      />
      <Tab.Screen
        name="Join Call"
        component={JoinCallsScreen}
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
  );
};

export default Layout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
