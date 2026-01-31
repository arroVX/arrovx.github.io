import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// --- PANDUAN UNTUK RO ---
// 1. Buka https://console.firebase.google.com/
// 2. Buat project baru (namanya bebas, misal "Portfolio-Arro")
// 3. Daftarkan aplikasi "Web" (klik ikon </>)
// 4. Copy bagian "firebaseConfig" dan ganti di bawah ini:

const firebaseConfig = {
    apiKey: "TUANGKAN_API_KEY_KAMU_DISINI",
    authDomain: "PROJECT_KAMU.firebaseapp.com",
    projectId: "PROJECT_KAMU",
    storageBucket: "PROJECT_KAMU.appspot.com",
    messagingSenderId: "SENDER_ID_KAMU",
    appId: "APP_ID_KAMU"
};

// Hubungkan ke Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
