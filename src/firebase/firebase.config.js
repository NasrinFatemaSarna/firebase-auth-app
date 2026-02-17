import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC6N9RoMm_j1gKgIy2Oor7l4F3p6VEhJ1Y",
  authDomain: "fir-app-4dab9.firebaseapp.com",
  projectId: "fir-app-4dab9",
  storageBucket: "fir-app-4dab9.appspot.com", // ✅ correction (important)
  messagingSenderId: "138984017806",
  appId: "1:138984017806:web:70b317fdda26deb493dedf",
  measurementId: "G-MX4M9QGQSH",
};

// ✅ App init (safe)
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);
