// firebase.js
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// Use this to avoid "Firebase App named '[DEFAULT]' already exists" error in Next.js
const firebaseConfig = {
  apiKey: "AIzaSyDnx1GGUCpfWw0du21mzRuC074N_ed0jcg",
  authDomain: "chattingbase-68c94.firebaseapp.com",
  projectId: "chattingbase-68c94",
  storageBucket: "chattingbase-68c94.appspot.com",
  messagingSenderId: "452470680119",
  appId: "1:452470680119:web:dda140c5effe96cc012db2",
  measurementId: "G-5NPPDYZZBC"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export { app, auth };
export const db = getFirestore(app);