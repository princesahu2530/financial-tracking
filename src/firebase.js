// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import {getAuth, GoogleAuthProvider} from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDrQdFzMQeqF6hgV0N4JjgMfKaEMZLTCn4",
  authDomain: "finance-tracker-82242.firebaseapp.com",
  projectId: "finance-tracker-82242",
  storageBucket: "finance-tracker-82242.appspot.com",
  messagingSenderId: "573661280980",
  appId: "1:573661280980:web:d175fdc84e455bb5209941",
  measurementId: "G-0J6PXR2L5W"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db =getFirestore(app);
const auth =getAuth(app);
const provider = new GoogleAuthProvider();
export {db, auth, provider, doc, setDoc};