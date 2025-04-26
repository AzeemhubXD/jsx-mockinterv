// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAP4NTLZ22_q3tXt0i0aWKEsBOFTcb8VEY",
  authDomain: "senprep.firebaseapp.com",
  projectId: "senprep",
  storageBucket: "senprep.firebasestorage.app",
  messagingSenderId: "114620601501",
  appId: "1:114620601501:web:195d4c7672d3bead5a7074",
  measurementId: "G-V47W21BRBE"
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig): getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);