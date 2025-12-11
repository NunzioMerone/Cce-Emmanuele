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

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "dummy-key",
  authDomain:
    import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "dummy.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "dummy-project",
  storageBucket:
    import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "dummy.appspot.com",
  messagingSenderId:
    import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "123456789",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:123456789:web:abc123",
};

// Verifica se Firebase è configurato correttamente
const isFirebaseConfigured =
  import.meta.env.VITE_FIREBASE_API_KEY &&
  import.meta.env.VITE_FIREBASE_PROJECT_ID;

let db: any = null;
let app: any = null;

if (isFirebaseConfigured) {
  try {
    app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    console.log("✅ Firebase inizializzato correttamente");
  } catch (error) {
    console.warn("⚠️ Firebase non configurato, uso solo localStorage");
  }
} else {
  console.warn("⚠️ Firebase non configurato, uso solo localStorage");
}

export { db };

export const firebaseService = {
  // Eventi
  async saveEvents(events: any[]) {
    if (!db) {
      console.log("⚠️ Firebase non disponibile, salvo solo in localStorage");
      return;
    }
    try {
      const docRef = doc(db, "content", "events");
      await setDoc(docRef, {
        data: events,
        updatedAt: new Date().toISOString(),
      });
      console.log("✅ Eventi salvati su Firebase");
    } catch (error) {
      console.error("❌ Errore salvataggio Firebase:", error);
    }
  },

  async getEvents() {
    if (!db) return null;
    try {
      const docRef = doc(db, "content", "events");
      const docSnap = await getDoc(docRef);
      return docSnap.exists() ? docSnap.data().data : null;
    } catch (error) {
      console.error("❌ Errore lettura Firebase:", error);
      return null;
    }
  },

  // Ministeri
  async saveMinistries(ministries: any[]) {
    if (!db) return;
    try {
      const docRef = doc(db, "content", "ministries");
      await setDoc(docRef, {
        data: ministries,
        updatedAt: new Date().toISOString(),
      });
      console.log("✅ Ministeri salvati su Firebase");
    } catch (error) {
      console.error("❌ Errore salvataggio Firebase:", error);
    }
  },

  async getMinistries() {
    if (!db) return null;
    try {
      const docRef = doc(db, "content", "ministries");
      const docSnap = await getDoc(docRef);
      return docSnap.exists() ? docSnap.data().data : null;
    } catch (error) {
      console.error("❌ Errore lettura Firebase:", error);
      return null;
    }
  },

  // Playlist
  async savePlaylists(playlists: any[]) {
    if (!db) return;
    try {
      const docRef = doc(db, "content", "playlists");
      await setDoc(docRef, {
        data: playlists,
        updatedAt: new Date().toISOString(),
      });
      console.log("✅ Playlist salvate su Firebase");
    } catch (error) {
      console.error("❌ Errore salvataggio Firebase:", error);
    }
  },

  async getPlaylists() {
    if (!db) return null;
    try {
      const docRef = doc(db, "content", "playlists");
      const docSnap = await getDoc(docRef);
      return docSnap.exists() ? docSnap.data().data : null;
    } catch (error) {
      console.error("❌ Errore lettura Firebase:", error);
      return null;
    }
  },

  // Missione
  async saveMission(mission: any) {
    if (!db) return;
    try {
      const docRef = doc(db, "content", "mission");
      await setDoc(docRef, {
        data: mission,
        updatedAt: new Date().toISOString(),
      });
      console.log("✅ Missione salvata su Firebase");
    } catch (error) {
      console.error("❌ Errore salvataggio Firebase:", error);
    }
  },

  async getMission() {
    if (!db) return null;
    try {
      const docRef = doc(db, "content", "mission");
      const docSnap = await getDoc(docRef);
      return docSnap.exists() ? docSnap.data().data : null;
    } catch (error) {
      console.error("❌ Errore lettura Firebase:", error);
      return null;
    }
  },

  // Immagini Hero approvate
  async saveApprovedHeroImages(images: string[]) {
    if (!db) return;
    try {
      const docRef = doc(db, "content", "heroImages");
      await setDoc(docRef, {
        data: images,
        updatedAt: new Date().toISOString(),
      });
      console.log("✅ Immagini Hero salvate su Firebase");
    } catch (error) {
      console.error("❌ Errore salvataggio Firebase:", error);
    }
  },

  async getApprovedHeroImages() {
    if (!db) return null;
    try {
      const docRef = doc(db, "content", "heroImages");
      const docSnap = await getDoc(docRef);
      return docSnap.exists() ? docSnap.data().data : null;
    } catch (error) {
      console.error("❌ Errore lettura Firebase:", error);
      return null;
    }
  },
};
