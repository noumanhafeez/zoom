import { ImageBackground, KeyboardAvoidingView, Platform, StyleSheet, Text, View, TextInput, Image, TouchableOpacity, TouchableWithoutFeedback, Button } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import tw from 'tailwind-react-native-classnames';
import LinearGradient from 'react-native-linear-gradient';
import { auth, firestore, signInWithEmailAndPassword } from './firebaseConfig';


const Sign_in = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const handleData = async() => {
    try {
      const isUser = await signInWithEmailAndPassword(auth, email, pass);
      if(isUser.user.emailVerified){
        navigation.navigate('layout');
      }
    } catch (error) {
      console.log(error);
      
    }
  }
  
  return (
    <LinearGradient
      colors={['#42275a', '#734b6d']} // Gradient from gray-800 to black
      style={[tw`flex-1`]}
    >
      <View style={{top:240}}>
        <View style={{ position: 'absolute', top:40 }}>
          <Image
            source={require('../assets/call.png')} // Another image, stays as is
            style={{
              resizeMode: 'contain',
              bottom: Platform.OS === 'ios' ? 200 : 230,
              left: 150,
              width: 120,
              height: 120,
            }}
          />
        </View>
        <View style={{bottom:120, alignItems:'center'}}>
        <Text style={{position:'absolute', fontSize:25, top:Platform.OS === 'ios' ? 70 : 40, color:'rgba(239, 239, 240, 0.6)', fontWeight:'700', }}>Let's Have a Call!</Text>
        </View>
        <View style={{position:'absolute', padding:50, top:-10}}>
        <Text style={{fontSize:15, bottom:30, color:'rgba(239, 239, 240, 0.7)'}}>Username</Text>
        <View style={{position:'absolute'}}>
        <Image
          source={require('../assets/user.png')} // Replace with your icon path
          style={{ width: 25, opacity:0.3, height: 25, top:Platform.OS === 'ios' ? 62 : 65, left:70 }}
         />
         </View>
        <TextInput
        style={{
          position:'absolute',
          padding:16,
          top:50,
          borderColor:'rgba(134, 111, 123, 0.24)',
          backgroundColor:'rgba(134, 111, 123, 0.24)',
          left:49,
          borderRadius:7,
          //borderWidth:1,
          paddingLeft:70,
          width:310,
          color:'rgba(239, 239, 240, 0.5)'
        }}
        placeholder='Email'
        value={email}
        autoCapitalize='none'
        onChangeText={(text) => setEmail(text)}
        placeholderTextColor="gray"
        >
        </TextInput>
        <Text style={{fontSize:15, top:53, color:'rgba(239, 239, 240, 0.7)'}}>Password</Text>
        <View style={{position:'absolute'}}>
        <Image
          source={require('../assets/key.png')} // Replace with your icon path
          style={{ width: 22, opacity:0.3, height: 22, top:Platform.OS === 'ios' ? 165 : 177, left:70 }}
         />
         </View>
        <TextInput
        style={{
          position:'absolute',
          padding:16,
          paddingLeft:70,
          top:Platform.OS === 'ios' ? 150 : 160,
          borderColor:'rgba(134, 111, 123, 0.24)',
          backgroundColor:'rgba(134, 111, 123, 0.24)',
          left:49,
          borderRadius:7,
          //borderWidth:1,
          //height:20,
          width:310,
          color:'rgba(239, 239, 240, 0.5)'
        }}
        placeholder='Password'
        placeholderTextColor="gray"
        autoCapitalize='none'
        secureTextEntry
        value={pass}
        onChangeText={(password) => setPass(password)}
        >
        </TextInput>
        <View style={{ paddingTop: Platform.OS === 'ios' ? 170 : 150, alignItems: 'center' }}> 
        
    <TouchableOpacity
      style={{
        //paddingVertical: 15,
        //alignItems: 'center',
        //justifyContent: 'center',
        //borderRadius: 25, // Match the border radius
        //width: '100%', // Full width inside the gradient
        //backgroundColor:'red'
      }}
      onPress={() => handleData()} // Add your onPress action here
    >
      <LinearGradient
      colors={['#4568dc', '#b06ab3']}
      style={{
        borderRadius: 25, // Apply the same borderRadius to the gradient as the button
        width: 300, // Button width
        height:50,
        alignItems: 'center',
        opacity:0.9,
        justifyContent: 'center',
      }}
      >
      <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Sign In</Text>
      </LinearGradient>
    </TouchableOpacity>
        </View>
        <Text style={{left: 90, color:'rgba(239, 239, 240, 0.7)', fontSize:15, top: 20}}>Or Continue with</Text>
        {/* Row of Images with 24x24 size */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 35 }}>
          <View style={styles.iconContainer}>
            <Image
              source={require('../assets/google.png')} // Replace with your icon path
              style={styles.icon}
            />
          </View>
          <View style={styles.iconContainer}>
          <Image
               source={
               Platform.OS === 'android'
                ? require('../assets/microsoft.png') // Use Microsoft icon for Android
                : require('../assets/apple.png')      // Use Apple icon for iOS
              }
             style={styles.icon}
             />
          </View>
          <View style={styles.iconContainer}>
            <Image
              source={require('../assets/facebook.png')} // Replace with your icon path
              style={styles.icon}
            />
          </View>
        </View>
        {/* Signup Section */}
        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 40 }}>
          <Text style={{ color: 'rgba(239, 239, 240, 0.7)', fontSize: 15 }}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('sign_up')}>
            <Text style={{ color: 'rgba(239, 239, 240, 0.8)', fontSize: 15, fontWeight: 'bold' }}>Signup</Text>
          </TouchableOpacity>
        </View>
        </View>
        </View>
      </LinearGradient>
      
  );
};

export default Sign_in;

const styles = StyleSheet.create({
  iconContainer: {
    width: 50,
    height: 43,
    borderRadius:5,
    backgroundColor:'rgba(134, 111, 123, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
});
