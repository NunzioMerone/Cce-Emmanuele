import { Event } from "../types/events";
import { Ministry } from "../types/ministries";
import { MediaItem } from "../types/media";
import { Mission } from "../types/mission";
import { AdminSession } from "../types/admin";
import { Playlist } from "../types/media";

const STORAGE_KEYS = {
  EVENTS: "chiesa_events",
  MINISTRIES: "chiesa_ministries",
  MEDIA: "chiesa_media",
  MISSION: "chiesa_mission",
  ADMIN_SESSION: "chiesa_admin_session",
  PLAYLISTS: "chiesa_playlists",
};

export const storage = {
  // Events
  getEvents: (): Event[] | null => {
    const data = localStorage.getItem(STORAGE_KEYS.EVENTS);
    return data ? JSON.parse(data) : null;
  },

  setEvents: (events: Event[]): void => {
    localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(events));
  },

  // Ministries
  getMinistries: (): Ministry[] | null => {
    const data = localStorage.getItem(STORAGE_KEYS.MINISTRIES);
    return data ? JSON.parse(data) : null;
  },

  setMinistries: (ministries: Ministry[]): void => {
    localStorage.setItem(STORAGE_KEYS.MINISTRIES, JSON.stringify(ministries));
  },

  // Media
  getMedia: (): MediaItem[] | null => {
    const data = localStorage.getItem(STORAGE_KEYS.MEDIA);
    return data ? JSON.parse(data) : null;
  },

  setMedia: (media: MediaItem[]): void => {
    localStorage.setItem(STORAGE_KEYS.MEDIA, JSON.stringify(media));
  },

  // Mission
  getMission: (): Mission | null => {
    const data = localStorage.getItem(STORAGE_KEYS.MISSION);
    return data ? JSON.parse(data) : null;
  },

  setMission: (mission: Mission): void => {
    localStorage.setItem(STORAGE_KEYS.MISSION, JSON.stringify(mission));
  },

  // Admin Session
  getAdminSession: (): AdminSession | null => {
    const data = localStorage.getItem(STORAGE_KEYS.ADMIN_SESSION);
    return data ? JSON.parse(data) : null;
  },

  setAdminSession: (session: AdminSession): void => {
    localStorage.setItem(STORAGE_KEYS.ADMIN_SESSION, JSON.stringify(session));
  },

  clearAdminSession: (): void => {
    localStorage.removeItem(STORAGE_KEYS.ADMIN_SESSION);
  },

  // Playlists
  setPlaylists: (playlists: Playlist[]) => {
    try {
      localStorage.setItem(STORAGE_KEYS.PLAYLISTS, JSON.stringify(playlists));
      console.log("✅ Playlist salvate nel localStorage");
    } catch (error) {
      console.error("Error saving playlists:", error);
    }
  },

  getPlaylists: (): Playlist[] | null => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PLAYLISTS);
      if (data) {
        const playlists = JSON.parse(data);
        console.log("✅ Playlist caricate dal localStorage:", playlists.length);
        return playlists;
      }
      console.log("⚠️ Nessuna playlist nel localStorage");
      return null;
    } catch (error) {
      console.error("Error loading playlists:", error);
      return null;
    }
  },

  // Clear all
  clearAll: (): void => {
    Object.values(STORAGE_KEYS).forEach((key) => {
      localStorage.removeItem(key);
    });
  },
};
