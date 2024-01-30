// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "projetocardapio-42264.firebaseapp.com",
  projectId: "projetocardapio-42264",
  storageBucket: "projetocardapio-42264.appspot.com",
  messagingSenderId: "334153662319",
  appId: "1:334153662319:web:d4fdbb60da2ae1a8e3729a",
  measurementId: "G-V5LY5E9Z02"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);