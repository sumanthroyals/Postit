// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getAuth,GoogleAuthProvider} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDttSS3xR1MIWKcIXGMLERAFl64RLC1KLY",
  authDomain: "blogging-bc6b2.firebaseapp.com",
  projectId: "blogging-bc6b2",
  storageBucket: "blogging-bc6b2.appspot.com",
  messagingSenderId: "86382091357",
  appId: "1:86382091357:web:dc9c26be72bc18baf501b4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db=getFirestore(app)
export const auth=getAuth(app)
export const provider= new GoogleAuthProvider();