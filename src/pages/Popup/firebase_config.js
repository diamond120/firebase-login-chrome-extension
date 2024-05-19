import { initializeApp } from 'firebase/app';

// TODO Fill Me!
// Find my details from Firebase Console

// config after registering firebase App

export const FIREBASE_SESSION_KEY = 'firebase_session';
const config = {
  apiKey: '',
  authDomain: 'mythic-fabric-417721.firebaseapp.com',
  projectId: 'mythic-fabric-417721',
  storageBucket: 'mythic-fabric-417721.appspot.com',
  messagingSenderId: '225706941399',
  appId: '1:225706941399:web:f83480268c6a73747b0992',
  measurementId: 'G-QG72YTPKMD',
};

// This creates firebaseApp instance
// version: SDK 9
const firebaseApp = initializeApp(config);

export { firebaseApp };
