// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
console.log(import.meta.env.VITE_FIREBASE_API_KEY);
const firebaseConfig = {
  // eslint-disable-next-line no-undef
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-ca8a0.firebaseapp.com",
  projectId: "mern-blog-ca8a0",
  storageBucket: "mern-blog-ca8a0.appspot.com",
  messagingSenderId: "688494281992",
  appId: "1:688494281992:web:d8ab471879c882fa2318bd",
  measurementId: "G-V31H177PT1"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// eslint-disable-next-line no-unused-vars
