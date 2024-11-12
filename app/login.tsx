import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import auth from '@react-native-firebase/auth';
import { TextInput } from 'react-native-gesture-handler';
import { NavigationContainer, useNavigation } from '@react-navigation/native';


const Login = () => {
 const [myData, setData] = useState(null);
 const [email, setEmail] = useState("");
 const [pass, setpass] = useState("");
 
 const navigation = useNavigation();
  

  const handledata = async() => {
    try {
      const isUser = await auth().signInWithEmailAndPassword(email, pass);
      console.log(isUser)
      if(isUser.user.emailVerified){
        navigation.navigate('home', { email });
      }
      else{
        
      }
      
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <View style={{top:150}}>
      <TextInput  style={{borderWidth:1, top:40, width:200, left:40}} placeholder='Enter your email' autoCapitalize='none' value={email} onChangeText={(text) => setEmail(text)}></TextInput>
      <TextInput  style={{borderWidth:1, top:80, width:200, left:40}} placeholderTextColor="black" placeholder='Enter your password' value={pass} onChangeText={(passtext) => setpass(passtext)}></TextInput>
      <TouchableOpacity onPress={() => handledata()} style={{borderWidth:1, height:50,top:150, width:300, left: 50, borderRadius:40, backgroundColor:'blue'}}><Text style={{color:'white', textAlign:'center', top:10}}>Login</Text></TouchableOpacity>

    </View>
  );
}

export default Login;

const styles = StyleSheet.create({});
