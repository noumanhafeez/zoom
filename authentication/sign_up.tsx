import {
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Button
} from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import tw from 'tailwind-react-native-classnames';
import LinearGradient from 'react-native-linear-gradient';
import { auth, firestore } from './firebaseConfig';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

const Sign_up = () => {
  const navigation = useNavigation();
  const [selectedDegree, setSelectedDegree] = useState('');
  const [isDegreeMenuOpen, setIsDegreeMenuOpen] = useState(false);
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [schoolName, setschoolName] = useState("");
  const [degree, setDegree] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [phone, setPhone] = useState("");

  const handleData = async() => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
      await sendEmailVerification(userCredential.user);  // Send verification email
      navigation.navigate('sign_in');  // Navigate to sign-in screen

      // Save user data in Firestore
      const userDocRef = doc(firestore, 'users', userCredential.user.uid);
      const userData = {
        firstName,
        lastName,
        schoolName,
        degree: selectedDegree,
        email,
        phone,
      };
      
      await setDoc(userDocRef, userData);  // Store user data in Firestore
    } catch (error) {
      console.error("Error signing up: ", error);
    }
  }


  return (
    <LinearGradient
      colors={['#42275a', '#734b6d']} // Gradient background
      style={[tw`flex-1`]}
    >
      <View style={{ top: Platform.OS === 'ios' ? 170 : 100 }}>
        
        <View style={{ bottom: 120, alignItems: 'center' }}>
          <Text
            style={{
              position: 'absolute',
              fontSize: 18,
              top: 50,
              color: 'rgba(239, 239, 240, 0.9)',
              fontWeight: '700',
              marginBottom:30
            }}
          >
            Let's create an account!
          </Text>
        </View>

        {/* Row for First Name and Last Name */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 50, marginBottom: 20 }}>
          <View style={{ flex: 1, marginRight: 10, }}>
            <Text style={styles.label}>First Name</Text>
            <TextInput
              style={styles.input}
              placeholder='First Name'
              placeholderTextColor="gray"
              value={firstName}
              onChangeText={(name) => setfirstName(name)}
            />
          </View>

          <View style={{ flex: 1 }}>
            <Text style={styles.label}>Last Name</Text>
            <TextInput
              style={styles.input}
              placeholder='Last Name'
              placeholderTextColor="gray"
              value={lastName}
              onChangeText={(lastname) => setlastName(lastname)}
            />
          </View>
        </View>

        {/* Email and Password Fields */}
        <View style={{ paddingHorizontal: 50 }}>
          <Text style={styles.label}>College/School Name</Text>
          <TextInput
            style={[styles.input, { width: '100%' }]}
            placeholder='College/Shool Name'
            placeholderTextColor="gray"
            value={schoolName}
            onChangeText={(school) => setschoolName(school)}
          />

          {/* Degree Dropdown */}
          <Text style={[styles.label, { marginTop: 10 }]}>Degree</Text>
          <TouchableOpacity
            style={styles.degreeContainer}
            onPress={() => setIsDegreeMenuOpen(!isDegreeMenuOpen)}
          >
            <Text style={{ color: selectedDegree ? 'rgba(239, 239, 240, 0.4)' : 'gray' }}>
              {selectedDegree ? selectedDegree : 'Select Degree'}
            </Text>
            <Image
              source={isDegreeMenuOpen ? require('../assets/up.png') : require('../assets/down.png')}
              style={styles.arrowIcon}
            />
          </TouchableOpacity>

          {/* Conditionally render Picker based on isDegreeMenuOpen */}
          {isDegreeMenuOpen && (
            <View style={styles.pickerOverlay}>
              <Picker
                selectedValue={selectedDegree}
                onValueChange={(itemValue) => {
                  setSelectedDegree(itemValue);
                  setIsDegreeMenuOpen(false); // Close menu after selection
                }}
                style={styles.pickerStyle}
                itemStyle={{ color: 'white', fontSize:20 }}
              >
                <Picker.Item label="Select Degree" value="" style={{ color: 'white' }} />
                <Picker.Item label="Bachelor's" value="bachelors" />
                <Picker.Item label="Master's" value="masters" />
                <Picker.Item label="Ph.D." value="phd" />
              </Picker>
            </View>
          )}

          {/* Username and Password Fields */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
            <View style={{ flex: 1, marginRight: 10 }}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="gray"
                value={email}
                autoCapitalize='none'
                onChangeText={(emal) => setEmail(emal)}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.label}>Password</Text>
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="gray"
                secureTextEntry
                autoCapitalize='none'
                value={pass}
                onChangeText={(password) => setPass(password)}
              />
            </View>
          </View>

          {/* Mobile Phone Number Field */}
          <Text style={[styles.label, { marginTop: 20 }]}>Mobile Phone No.</Text>
          <TextInput
            style={[styles.input, { width: '100%' }]}
            placeholder="Mobile Phone No."
            placeholderTextColor="gray"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={(cell) => setPhone(cell)}
          />
        </View>

        {/* Sign In Button */}
        <View style={{ paddingTop: 30, alignItems: 'center' }}>
          <TouchableOpacity onPress={() => handleData()}>
            <LinearGradient
              colors={['#4568dc', '#b06ab3']}
              style={styles.signInButton}
            >
              <Text style={styles.signInText}>Sign Up</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Social Login Section */}
        <Text style={styles.continueText}>Or Signup with</Text>
        <View style={styles.socialIconsContainer}>
          <View style={styles.iconContainer}>
            <Image source={require('../assets/google.png')} style={styles.icon} />
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
            <Image source={require('../assets/facebook.png')} style={styles.icon} />
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};

export default Sign_up;

const styles = StyleSheet.create({
  label: {
    fontSize: 15,
    color: 'rgba(239, 239, 240, 0.7)',
    marginBottom: 5,
  },
  input: {
    padding: 12,
    borderColor: 'rgba(134, 111, 123, 0.24)',
    backgroundColor: 'rgba(134, 111, 123, 0.24)',
    borderRadius: 5,
    color: 'rgba(239, 239, 240, 0.5)',
  },
  degreeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(134, 111, 123, 0.24)',
    borderRadius: 5,
    padding: 10,
  },
  arrowIcon: {
    width: 20,
    height: 20,
    marginLeft: Platform.OS === 'ios' ? 268 : 275,
    tintColor: 'gray',
    position:'absolute'
  },
  iconPosition: {
    width: 22,
    height: 22,
    //position: 'absolute',
    top: Platform.OS === 'ios' ? 10 : 12,
    left: 12,
    opacity: 0.3,
  },
  signInButton: {
    borderRadius: 25,
    width: 300,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signInText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  continueText: {
    textAlign: 'center',
    color: 'rgba(239, 239, 240, 0.7)',
    fontSize: 15,
    marginTop: 20,
  },
  socialIconsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    //marginLeft:60
  },
  iconContainer: {
    width: 50,
    height: 43,
    borderRadius: 5,
    backgroundColor: 'rgba(134, 111, 123, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal:15
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  pickerOverlay: {
    //position:'absolute',
    //backgroundColor: 'white',
    //borderRadius: 5,
    //width: '80%',
    //marginTop: 5,
    zIndex: 1000, // Ensure it stays on top of other elements
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 40,
  },
  signupText: {
    color: 'rgba(239, 239, 240, 0.7)',
    fontSize: 15,
  },
  signupLink: {
    color: 'rgba(239, 239, 240, 0.8)',
    fontSize: 15,
    fontWeight: 'bold',
  },
  pickerStyle: {
    bottom:Platform.OS === 'ios'? 50: 20,
    height: 120,
    width: '100%',
  },
});