// firebase/config.ts

import { initializeApp } from 'firebase/app';
import {
  browserLocalPersistence,
  initializeAuth
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAQR_bWbRGQUE0tAN7ezJt-ZqS-ds9rda0",
  authDomain: "tanda-app-3bf96.firebaseapp.com",
  projectId: "tanda-app-3bf96",
  storageBucket: "tanda-app-3bf96.firebasestorage.app",
  messagingSenderId: "791014941796",
  appId: "1:791014941796:web:ad6e1d382e804d61c26b71",
  measurementId: "G-8QZJFNF001"
};

// Inisialisasi Firebase App
const app = initializeApp(firebaseConfig);


// Inisialisasi Auth dengan penyimpanan di perangkat
export const auth = initializeAuth(app, {
  persistence: browserLocalPersistence,
});

// Inisialisasi Firestore & Storage
export const db = getFirestore(app);
export const storage = getStorage(app);