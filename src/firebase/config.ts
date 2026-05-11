import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getDatabase } from 'firebase/database';

// Firebase configuration from the console
const firebaseConfig = {
  apiKey: 'AIzaSyBoe5P5JC2vyipnMrkal6FRZ-3GXWyrWps',
  authDomain: 'do-forno-ao-altar.firebaseapp.com',
  databaseURL: 'https://do-forno-ao-altar-default-rtdb.firebaseio.com',
  projectId: 'do-forno-ao-altar',
  storageBucket: 'do-forno-ao-altar.firebasestorage.app',
  messagingSenderId: '239084034007',
  appId: '1:239084034007:web:cdc1f2fe9e0c3a9f375d92',
  measurementId: 'G-73BS0LJSBB'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore Database
export const db = getFirestore(app);

// Initialize Realtime Database
export const rtdb = getDatabase(app);

// Initialize Firebase Authentication
export const auth = getAuth(app);

// Initialize Storage
export const storage = getStorage(app);

export default app;
