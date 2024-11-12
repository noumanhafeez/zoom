import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import  firestore   from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { TextInput } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

const Signup = () => {
 const [myData, setData] = useState(null);
 const [email, setEmail] = useState("");
 const [pass, setpass] = useState("");

 const navigation = useNavigation();

  const handledata = async() => {
    try {
      const isUser = await auth().createUserWithEmailAndPassword(email,pass);
      await auth().currentUser?.sendEmailVerification();
      await auth().signOut();
      navigation.navigate('login');
      
      // user's data store in firebase database.
      const database = {
        email: email,
        pass: pass
      }
      await firestore().collection("users").add(database)
    
    
    } catch (error) {
      console.log(error)

    }
  }

  return (
    <View style={{top:150}}>
      <TextInput  style={{borderWidth:1, top:40, width:200, left:40}} placeholder='Enter your email' autoCapitalize='none' value={email} onChangeText={(text) => setEmail(text)}></TextInput>
      <TextInput  style={{borderWidth:1, top:80, width:200, left:40}} placeholderTextColor="black" placeholder='Enter your password' value={pass} onChangeText={(passtext) => setpass(passtext)}></TextInput>
      <TouchableOpacity onPress={() => handledata()} style={{borderWidth:1, height:50,top:150, width:300, left: 50, borderRadius:40, backgroundColor:'blue'}}><Text style={{color:'white', textAlign:'center', top:10}}>Singup</Text>
    </TouchableOpacity>
    </View>
  );
}

export default Signup;

const styles = StyleSheet.create({});
