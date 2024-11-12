import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import React, {useState} from 'react'
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../src/HomeScreen';
import {CallScreen} from '../src/CallScreen';

// 1. Import the StreamVideo and StreamVideoClient components
import {
  StreamVideo,
  StreamVideoClient,
} from '@stream-io/video-react-native-sdk';

// 2. Create a StreamVideoClient instance
const apiKey = 'cypv86k7r7tg'; // the API key can be found in the "Credentials" section
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiSm9obl9TbWl0aCIsInJvbGUiOiJ1c2VyIiwiZXhwIjoxNzMxMzQ2ODg5LCJpYXQiOjE3MzEzNDMyODl9.IesUayY7Nn3oxq9JFYyenqpaHWZbe9TyP4d2sruSiXQ'
const userId = 'John_Smith'; // the user id can be found in the "Credentials" section
const callId = 'default_35e8342e-a1d2-4ea4-874a-e55afbe866a3'; // the call id can be found in the "Credentials" section

// 3. Create a user object
const user = {
  id: userId,
  name: 'John Malkovich',
  image: `https://getstream.io/random_png/?id=${userId}&name=John+Malkovich`,
};
// 4. Create a StreamVideoClient instance
const client = new StreamVideoClient({ apiKey, user, token });



const Stack = createStackNavigator()

const App = () => {
  const [activeScreen, setActiveScreen] = useState('home');
  const goToCallScreen = () => setActiveScreen('call-screen');
  const goToHomeScreen = () => setActiveScreen('home');

  return (
    // 5. Wrap your app with the StreamVideo component
    <StreamVideo client={client}>
      <SafeAreaView style={styles.container}>
        {activeScreen === 'call-screen' ? (
          <CallScreen goToHomeScreen={goToHomeScreen} callId={callId} />
        ) : (
          <HomeScreen goToCallScreen={goToCallScreen} />
        )}
      </SafeAreaView>
    </StreamVideo>
  );
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    backgroundColor:'red'
  },
})