export interface AdminUser {
  username: string;
  isAuthenticated: boolean;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AdminSession {
  username: string;
  loginTime: string;
}

export type AdminView =
  | "dashboard"
  | "events"
  | "ministries"
  | "playlists"
  | "mission";

export interface AdminCredentials {
  username: string;
  password: string;
}
