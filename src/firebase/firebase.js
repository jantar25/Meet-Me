// import firebase from 'firebase/compat/app';
// import 'firebase/compat/auth';
// import 'firebase/compat/firestore';
// import { getAuth } from 'firebase/auth';


// const firebaseConfig = {
//   apiKey: "AIzaSyCmUB8Mn63vvOWV-EMElPSKxw8KTHykiNQ",
//   authDomain: "meet-me-21c2c.firebaseapp.com",
//   projectId: "meet-me-21c2c",
//   storageBucket: "meet-me-21c2c.appspot.com",
//   messagingSenderId: "604109569585",
//   appId: "1:604109569585:web:e4613a92f13aca6ef29f10",
//   measurementId: "G-K1CNY58PHF"
// };

// // Initialize Firebase
// const firebaseApp = firebase.initializeApp(firebaseConfig);
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCmUB8Mn63vvOWV-EMElPSKxw8KTHykiNQ",
  authDomain: "meet-me-21c2c.firebaseapp.com",
  projectId: "meet-me-21c2c",
  storageBucket: "meet-me-21c2c.appspot.com",
  messagingSenderId: "604109569585",
  appId: "1:604109569585:web:e4613a92f13aca6ef29f10",
  measurementId: "G-K1CNY58PHF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)

export { auth,db };