// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  // apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  // authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  // projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  // storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  // messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  // appId: import.meta.env.VITE_FIREBASE_APP_ID,
  // measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,

  apiKey: "AIzaSyBhZ6RH95fCBenJFmoqVpn-MRGQdXaioGg",
  authDomain: "chat-app-75eb9.firebaseapp.com",
  projectId: "chat-app-75eb9",
  storageBucket: "chat-app-75eb9.appspot.com",
  messagingSenderId: "622574147925",
  appId: "1:622574147925:web:8765071a58cf6ee19af7dc",
  measurementId: "G-QE6T24VVTM",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore()
export { auth, db }
