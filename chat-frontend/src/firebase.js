// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBH6_NKwbxr_wPdph84wDpffHXNMQpUjCg",
  authDomain: "vibemate-4ea4f.firebaseapp.com",
  projectId: "vibemate-4ea4f",
  storageBucket: "vibemate-4ea4f.firebasestorage.app",
  messagingSenderId: "769114488409",
  appId: "1:769114488409:web:f29e6062345a2bb9c87b48",
  measurementId: "G-873BF4EKZP"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
