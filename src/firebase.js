import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// --- PANDUAN UNTUK RO ---
// 1. Buka https://console.firebase.google.com/
// 2. Buat project baru (namanya bebas, misal "Portfolio-Arro")
// 3. Daftarkan aplikasi "Web" (klik ikon </>)
// 4. Copy bagian "firebaseConfig" dan ganti di bawah ini:

const firebaseConfig = {
    apiKey: "AIzaSyCR78HlkHS4qwSrgPIhTguCYzgjckLNu0Q",
    authDomain: "arro-portofolio.firebaseapp.com",
    projectId: "arro-portofolio",
    storageBucket: "arro-portofolio.firebasestorage.app",
    messagingSenderId: "618950653172",
    appId: "1:618950653172:web:7a0e8d8e70099d20a1daa1",
    measurementId: "G-4J9X1JW0F9"
};

// Hubungkan ke Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
