// firebaseConfig.js

import { FirebaseApp, initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';


// Replace with your Firebase project config
const firebaseConfig = {
  apiKey: "Your_API_key",
  projectId: "Your_Project_Id",
  messagingSenderId: "Your_Messaging_Id",

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth and Firestore
const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
  });

const firestore = getFirestore(app);

export { auth, firestore, signInWithEmailAndPassword };
