import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Config Firebase via env (Vite). Lihat .env.example.
// Nilai fallback menjaga dev lokal tetap jalan, tapi WAJIB diisi via env di production.
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyAi4-VIoR6F2GBi451xkCrYmEOBgxuovXg",
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "rojing-54fcd.firebaseapp.com",
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "rojing-54fcd",
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "rojing-54fcd.firebasestorage.app",
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "388291905786",
    appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:388291905786:web:851146a30570b2581e2143",
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-DF5JW6403L"
};

// Hubungkan ke Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
