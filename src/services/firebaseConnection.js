import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBp5EHzILQBCUqp99WWsroBwXVLTNDKVhc",
    authDomain: "appmasters-a8999.firebaseapp.com",
    projectId: "appmasters-a8999",
    storageBucket: "appmasters-a8999.appspot.com",
    messagingSenderId: "788841797487",
    appId: "1:788841797487:web:c94a77fa24a55191f6ba9a"
  };


export const appFirebase = initializeApp(firebaseConfig);
export const db = getFirestore(appFirebase);
export const auth = getAuth(appFirebase);
export const storage = getStorage(appFirebase)
export const storageRef = ref(storage);