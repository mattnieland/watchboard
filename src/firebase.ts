import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: "watchboard-c3edf.firebaseapp.com",
    projectId: "watchboard-c3edf",
    storageBucket: "watchboard-c3edf.appspot.com",
    messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
  }
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);