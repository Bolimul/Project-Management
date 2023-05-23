// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore";
import {getAuth} from "firebase/auth";
import {getStorage} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCZNniZgM2NExRpJNBf5G9l7C6CcSnEOZw",
    authDomain: "project-management-510cc.firebaseapp.com",
    projectId: "project-management-510cc",
    storageBucket: "project-management-510cc.appspot.com",
    messagingSenderId: "31597167179",
    appId: "1:31597167179:web:806c900ae5c86697b603ce",
    measurementId: "G-XT0RES472V"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
