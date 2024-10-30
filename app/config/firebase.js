// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import "firebase/auth";
import { getAuth } from "firebase/auth";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyBkiWTF0ap4q3NHKqCMfbQmYn6XaEkvsfc",
  authDomain: "open-mind-chat-e2313.firebaseapp.com",
  projectId: "open-mind-chat-e2313",
  storageBucket: "open-mind-chat-e2313.appspot.com",
  messagingSenderId: "1028130489757",
  appId: "1:1028130489757:web:cd4a3f4279f9db90fe1b74"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export default app;