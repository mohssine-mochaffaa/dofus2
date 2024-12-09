// Import the functions you need from the SDKs you need
import { getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

/*
const firebaseConfig = {
  apiKey: "AIzaSyAkxJZEvl5sKMCFWelHotyYy8bM7VukCOc",
  authDomain: "dofus-test-de0fb.firebaseapp.com",
  projectId: "dofus-test-de0fb",
  storageBucket: "dofus-test-de0fb.firebasestorage.app",
  messagingSenderId: "128280069679",
  appId: "1:128280069679:web:d6878248bd0424267028da",
};
*/

const firebaseConfig = {
  apiKey: "AIzaSyD9euKAnPIHflkMl2B4HVmnJ42PJfM-bZ0", 
  authDomain: "data-dofus-firebase.firebaseapp.com",
  projectId: "data-dofus-firebase",
  storageBucket: "data-dofus-firebase.firebasestorage.app",
  messagingSenderId: "258615735356",
  appId: "1:258615735356:web:5296b0539af24075e63f39"
};

// Initialize Firebase

let firebase_app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(firebase_app);
export default db;
