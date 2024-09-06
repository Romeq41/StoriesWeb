// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-analytics.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js"; // Correct import for Firestore
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDMS_RXifHNwYrEQVFxcttiHUCBVnSFqRM",
  authDomain: "storiesapp-eca88.firebaseapp.com",
  projectId: "storiesapp-eca88",
  storageBucket: "storiesapp-eca88.appspot.com",
  messagingSenderId: "756441981490",
  appId: "1:756441981490:web:687e55101de5d9e0b7122b",
  measurementId: "G-V11TYRNJRZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { auth, signInWithEmailAndPassword };
export const db = getFirestore(app); 
