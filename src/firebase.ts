import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA9pB1178DkEHHdXwRGoPdLUrZT0SnmcGA",
  authDomain: "quotezap-7c5a3.firebaseapp.com",
  databaseURL: "https://quotezap-7c5a3-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "quotezap-7c5a3",
  storageBucket: "quotezap-7c5a3.firebasestorage.app",
  messagingSenderId: "803604344652",
  appId: "1:803604344652:web:13b3dedc667c1b2231e9e9",
  measurementId: "G-FR5LLFG1Y9"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
