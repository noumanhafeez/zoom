import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native-gesture-handler'
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';


const MobileVerfiy = () => {
    const [mob, setmob] = useState('');
    const [otp, setotp] = useState('');
    const [confirmData, setConfirm] = useState<FirebaseAuthTypes.ConfirmationResult | null>(null);

    const SendOtp = async () => {
        try {
                console.log("Sending OTP...");
                const resp = await auth().signInWithPhoneNumber(mob);
                setConfirm(resp);
                console.log("OTP sent:", resp);
             
        } catch (error) {
            console.error("Error sending OTP:", error);
        }
    };
  return (

    <View style={{top:300}}>
      <TextInput 
      style={{borderWidth:1, height:40, width:200, left:100}}
      placeholder='Enter your number'
      onChangeText={(value) => setmob(value)}
      >
      </TextInput>
      <Button title='Send OTP' onPress={() => SendOtp()}/>
      <TextInput 
      style={{borderWidth:1, height:40, width:200, left:100}}
      placeholder='Enter your OTP'
      onChangeText={(va) => setotp(va)}
      >
      </TextInput>
      {/* <Button title='Submit OTP' onPress={() => submitOtp}/> */}
    </View>
  )
}

export default MobileVerfiy

const styles = StyleSheet.create({})