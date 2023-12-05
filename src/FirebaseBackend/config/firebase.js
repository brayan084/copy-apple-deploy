// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCY8-pARonqO1pUR1pwi51W1ncuWtaY1zk",
  authDomain: "proyecto-copy-apple.firebaseapp.com",
  projectId: "proyecto-copy-apple",
  storageBucket: "proyecto-copy-apple.appspot.com",
  messagingSenderId: "190035877275",
  appId: "1:190035877275:web:d04819029c359d0ff8553e",
  measurementId: "G-FWYGYRGZ6L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app); 