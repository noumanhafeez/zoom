import React, { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useStreamVideoClient } from '@stream-io/video-react-native-sdk';
import LinearGradient from 'react-native-linear-gradient';
import tw from 'tailwind-react-native-classnames';


const MakeCalls = () => {
  const [callId, setCallId] = useState('default_new_call'); // Unique call ID
  const client = useStreamVideoClient();
  const navigation = useNavigation();

  const startCall = () => {
    if (client) {
      const call = client.call('default', callId);
      call
        .create()
        .then(() => {
          // Navigate to the CallScreen and pass the callId
          navigation.navigate('CallScreen', { callId });
        })
        .catch((error) => {
          console.error('Error starting call:', error);
        });
    }
  };

  return (
    <LinearGradient colors={['#42275a', '#734b6d']} style={[tw`flex-1`] }>
    <View style={styles.container}>
      <Text style={styles.text}>Ready to Start a Call?</Text>
      <Button title="Start Call" onPress={startCall} />
    </View>
    </LinearGradient>
  );
};

export default MakeCalls;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color:'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
});
