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
};

const useFirebase = true;

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

  getEvents: (): Event[] | null => {
    try {
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

  getMinistries: (): Ministry[] | null => {
    try {
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
    } catch (error) {
      console.error("Error saving playlists:", error);
    }
  },

  getPlaylists: (): Playlist[] | null => {
    try {
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

  getMission: (): Mission | null => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.MISSION);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error("Error loading mission:", error);
      return null;
    }
  },

  // Funzione per sincronizzare da Firebase (chiamata manualmente)
  syncFromFirebase: async () => {
    try {
      console.log("🔄 Sincronizzazione da Firebase...");

      const events = await firebaseService.getEvents();
      if (events) {
        localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(events));
      }

      const ministries = await firebaseService.getMinistries();
      if (ministries) {
        localStorage.setItem(
          STORAGE_KEYS.MINISTRIES,
          JSON.stringify(ministries)
        );
      }

      const playlists = await firebaseService.getPlaylists();
      if (playlists) {
        localStorage.setItem(STORAGE_KEYS.PLAYLISTS, JSON.stringify(playlists));
      }

      const mission = await firebaseService.getMission();
      if (mission) {
        localStorage.setItem(STORAGE_KEYS.MISSION, JSON.stringify(mission));
      }

      console.log("✅ Sincronizzazione completata");
      return true;
    } catch (error) {
      console.error("❌ Errore sincronizzazione:", error);
      return false;
    }
  },
};
