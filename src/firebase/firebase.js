import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


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
const firebaseApp = firebase.initializeApp(firebaseConfig);


export default firebaseApp;