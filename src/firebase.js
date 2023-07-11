// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"; 
import { getFirestore }  from "firebase/firestore";
import { getStorage }  from "firebase/storage";
import { getAuth }  from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDYVbmiOPksL2nU0CDbQ3t8x2JsMZfdN9A",
  authDomain: "podcast-app-rec.firebaseapp.com",
  projectId: "podcast-app-rec",
  storageBucket: "podcast-app-rec.appspot.com",
  messagingSenderId: "459188146242",
  appId: "1:459188146242:web:6f8069c279753f489d1ddb",
  measurementId: "G-B59GRNEKMQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { auth, db, storage };