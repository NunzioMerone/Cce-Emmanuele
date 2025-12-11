import { Event } from "../types/events";
import { Ministry } from "../types/ministries";
import { Playlist } from "../types/media";
import { Mission } from "../types/mission";
import { firebaseService } from "../services/firebase";

const STORAGE_KEYS = {
  EVENTS: "events",
  MINISTRIES: "ministries",
  PLAYLISTS: "playlists",
  MISSION: "mission",
  GALLERY: "gallery",
  ADMIN_AUTH: "adminAuth",
};

const useFirebase = true; // Flag per abilitare/disabilitare Firebase

export const storage = {
  // Eventi
  setEvents: async (events: Event[]) => {
    try {
      localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(events));
      if (useFirebase) {
        await firebaseService.saveEvents(events);
      }
    } catch (error) {
      console.error("Error saving events:", error);
    }
  },

  getEvents: async (): Promise<Event[] | null> => {
    try {
      // Prova prima Firebase
      if (useFirebase) {
        const firebaseData = await firebaseService.getEvents();
        if (firebaseData) {
          // Salva anche in localStorage per cache
          localStorage.setItem(
            STORAGE_KEYS.EVENTS,
            JSON.stringify(firebaseData)
          );
          return firebaseData;
        }
      }

      // Fallback su localStorage
      const data = localStorage.getItem(STORAGE_KEYS.EVENTS);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error("Error loading events:", error);
      return null;
    }
  },

  // Ministeri
  setMinistries: async (ministries: Ministry[]) => {
    try {
      localStorage.setItem(STORAGE_KEYS.MINISTRIES, JSON.stringify(ministries));
      if (useFirebase) {
        await firebaseService.saveMinistries(ministries);
      }
    } catch (error) {
      console.error("Error saving ministries:", error);
    }
  },

  getMinistries: async (): Promise<Ministry[] | null> => {
    try {
      if (useFirebase) {
        const firebaseData = await firebaseService.getMinistries();
        if (firebaseData) {
          localStorage.setItem(
            STORAGE_KEYS.MINISTRIES,
            JSON.stringify(firebaseData)
          );
          return firebaseData;
        }
      }

      const data = localStorage.getItem(STORAGE_KEYS.MINISTRIES);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error("Error loading ministries:", error);
      return null;
    }
  },

  // Playlist
  setPlaylists: async (playlists: Playlist[]) => {
    try {
      localStorage.setItem(STORAGE_KEYS.PLAYLISTS, JSON.stringify(playlists));
      if (useFirebase) {
        await firebaseService.savePlaylists(playlists);
      }
      console.log("✅ Playlist salvate");
    } catch (error) {
      console.error("Error saving playlists:", error);
    }
  },

  getPlaylists: async (): Promise<Playlist[] | null> => {
    try {
      if (useFirebase) {
        const firebaseData = await firebaseService.getPlaylists();
        if (firebaseData) {
          localStorage.setItem(
            STORAGE_KEYS.PLAYLISTS,
            JSON.stringify(firebaseData)
          );
          return firebaseData;
        }
      }

      const data = localStorage.getItem(STORAGE_KEYS.PLAYLISTS);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error("Error loading playlists:", error);
      return null;
    }
  },

  // Missione
  setMission: async (mission: Mission) => {
    try {
      localStorage.setItem(STORAGE_KEYS.MISSION, JSON.stringify(mission));
      if (useFirebase) {
        await firebaseService.saveMission(mission);
      }
    } catch (error) {
      console.error("Error saving mission:", error);
    }
  },

  getMission: async (): Promise<Mission | null> => {
    try {
      if (useFirebase) {
        const firebaseData = await firebaseService.getMission();
        if (firebaseData) {
          localStorage.setItem(
            STORAGE_KEYS.MISSION,
            JSON.stringify(firebaseData)
          );
          return firebaseData;
        }
      }

      const data = localStorage.getItem(STORAGE_KEYS.MISSION);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error("Error loading mission:", error);
      return null;
    }
  },
};
