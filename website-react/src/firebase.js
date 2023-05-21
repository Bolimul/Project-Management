// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAO6G_5SL5P5GRtMs9wXKb7R7GQhnYPZck",
  authDomain: "project-management-e5041.firebaseapp.com",
  projectId: "project-management-e5041",
  storageBucket: "project-management-e5041.appspot.com",
  messagingSenderId: "357606046264",
  appId: "1:357606046264:web:ca69d774f2a2d568bd04cd",
  measurementId: "G-TJKE0M30VH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);