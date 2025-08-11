// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCsclSqhqv5eTU0Yfy2XWgfKZPDV4dYm-4",
  authDomain: "netflix-clone-29167.firebaseapp.com",
  projectId: "netflix-clone-29167",
  storageBucket: "netflix-clone-29167.firebasestorage.app",
  messagingSenderId: "498761846871",
  appId: "1:498761846871:web:8e15c07d3839e2156d1312",
  measurementId: "G-1XR7DHK1HE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app); 