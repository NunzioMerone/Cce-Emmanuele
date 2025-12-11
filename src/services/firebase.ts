import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Inizializza Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

export const firebaseAuth = {
  async login(email: string, password: string) {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("✅ Login Firebase riuscito");
      return userCredential.user;
    } catch (error: any) {
      console.error("❌ Errore login Firebase:", error.message);
      throw error;
    }
  },

  async logout() {
    await signOut(auth);
    console.log("✅ Logout Firebase");
  },

  getCurrentUser() {
    return auth.currentUser;
  },
};

// Helper functions
export const firebaseService = {
  // Eventi
  async saveEvents(events: any[]) {
    const docRef = doc(db, "content", "events");
    await setDoc(docRef, { data: events, updatedAt: new Date().toISOString() });
    console.log("✅ Eventi salvati su Firebase");
  },

  async getEvents() {
    const docRef = doc(db, "content", "events");
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? docSnap.data().data : null;
  },

  // Ministeri
  async saveMinistries(ministries: any[]) {
    const docRef = doc(db, "content", "ministries");
    await setDoc(docRef, {
      data: ministries,
      updatedAt: new Date().toISOString(),
    });
    console.log("✅ Ministeri salvati su Firebase");
  },

  async getMinistries() {
    const docRef = doc(db, "content", "ministries");
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? docSnap.data().data : null;
  },

  // Playlist
  async savePlaylists(playlists: any[]) {
    const docRef = doc(db, "content", "playlists");
    await setDoc(docRef, {
      data: playlists,
      updatedAt: new Date().toISOString(),
    });
    console.log("✅ Playlist salvate su Firebase");
  },

  async getPlaylists() {
    const docRef = doc(db, "content", "playlists");
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? docSnap.data().data : null;
  },

  // Missione
  async saveMission(mission: any) {
    const docRef = doc(db, "content", "mission");
    await setDoc(docRef, {
      data: mission,
      updatedAt: new Date().toISOString(),
    });
    console.log("✅ Missione salvata su Firebase");
  },

  async getMission() {
    const docRef = doc(db, "content", "mission");
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? docSnap.data().data : null;
  },

  // Immagini Hero approvate
  async saveApprovedHeroImages(images: string[]) {
    const docRef = doc(db, "content", "heroImages");
    await setDoc(docRef, { data: images, updatedAt: new Date().toISOString() });
    console.log("✅ Immagini Hero salvate su Firebase");
  },

  async getApprovedHeroImages() {
    const docRef = doc(db, "content", "heroImages");
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? docSnap.data().data : null;
  },
};
