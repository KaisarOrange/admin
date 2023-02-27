import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import 'firebase/firestore';

// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592

const firebaseConfig = {
  apiKey: 'AIzaSyB01Q_AMKzUa9udcV0N9N96315BgxVmIfc',
  authDomain: 'pastaboysorder.firebaseapp.com',
  projectId: 'pastaboysorder',
  storageBucket: 'pastaboysorder.appspot.com',
  messagingSenderId: '688589310816',
  appId: '1:688589310816:web:3e6b47fa89e852f9d52c05',
  measurementId: 'G-XRQD79SDW9',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export { db };
