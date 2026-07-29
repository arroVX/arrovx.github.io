import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Config Firebase Project: rojing-54fcd
const firebaseConfig = {
    apiKey: "AIzaSyAi4-VIoR6F2GBi451xkCrYmEOBgxuovXg",
    authDomain: "rojing-54fcd.firebaseapp.com",
    projectId: "rojing-54fcd",
    storageBucket: "rojing-54fcd.firebasestorage.app",
    messagingSenderId: "388291905786",
    appId: "1:388291905786:web:851146a30570b2581e2143",
    measurementId: "G-DF5JW6403L"
};

// Hubungkan ke Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
