// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBH6_NKwbxr_wPdph84wDpffHXNMQpUjCg",
  authDomain: "vibemate-4ea4f.firebaseapp.com",
  projectId: "vibemate-4ea4f",
  storageBucket: "vibemate-4ea4f.firebasestorage.app",
  messagingSenderId: "769114488409",
  appId: "1:769114488409:web:39800abf4de7c507c87b48",
  measurementId: "G-E547F80MR0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);