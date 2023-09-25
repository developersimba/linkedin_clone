import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth"
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBo7kzS-IOF02gHbu3rkZdlwmLLgsv3c-s",
  authDomain: "linkedin-clone-1817f.firebaseapp.com",
  projectId: "linkedin-clone-1817f",
  storageBucket: "linkedin-clone-1817f.appspot.com",
  messagingSenderId: "862486708745",
  appId: "1:862486708745:web:af29b10062d9536239aed8"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider(app)
export const database = getFirestore(app)