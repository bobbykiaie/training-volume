// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDAVA-tLWBQVCfNe9baqyqTcn1Lx_km1e8",
  authDomain: "workout-volume.firebaseapp.com",
  projectId: "workout-volume",
  storageBucket: "workout-volume.appspot.com",
  messagingSenderId: "497261573501",
  appId: "1:497261573501:web:433c1ee06050d96de34814"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

export default db;