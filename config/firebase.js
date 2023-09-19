// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from 'firebase/firestore'
import { signInWithEmailAndPassword } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAqUbOg7oWJbLa9RECr93HlxYtZGNw3K0M",
  authDomain: "real-time-chat-44453.firebaseapp.com",
  projectId: "real-time-chat-44453",
  storageBucket: "real-time-chat-44453.appspot.com",
  messagingSenderId: "592049579663",
  appId: "1:592049579663:web:5f330460d51ddda09d32fa",
  measurementId: "G-4WSNRV04PQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
