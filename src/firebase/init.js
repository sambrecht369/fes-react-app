// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAMdSxevjTYga1Ivp2bYObDUZ5Hs8KnNZE",
  authDomain: "fes-react-app.firebaseapp.com",
  projectId: "fes-react-app",
  storageBucket: "fes-react-app.firebasestorage.app",
  messagingSenderId: "230514616061",
  appId: "1:230514616061:web:68700fd6290c8318c5c094"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();
