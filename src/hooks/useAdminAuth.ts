import { useState, useEffect } from "react";
import { AdminCredentials, AdminSession } from "../types/admin";
import { storage } from "../utils/storageUtils";

const ADMIN_CREDENTIALS = {
  username: "admin",
  password: "emmanuele2024",
};

export const useAdminAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const session = storage.getAdminSession();
    if (session) {
      setIsAuthenticated(true);
      setUsername(session.username);
    }
    setIsLoading(false);
  }, []);

  const logout = () => {
    storage.clearAdminSession();
    setIsAuthenticated(false);
    setUsername("");
    window.location.href = "/";
  };

  const login = (credentials: AdminCredentials): boolean => {
    if (
      credentials.username === ADMIN_CREDENTIALS.username &&
      credentials.password === ADMIN_CREDENTIALS.password
    ) {
      const session: AdminSession = {
        username: credentials.username,
        loginTime: new Date().toISOString(),
      };
      storage.setAdminSession(session);
      setIsAuthenticated(true);
      setUsername(credentials.username);
      return true;
    }
    return false;
  };

  const checkAuth = (): boolean => {
    const session = storage.getAdminSession();
    if (session) {
      setIsAuthenticated(true);
      setUsername(session.username);
      return true;
    }
    storage.clearAdminSession();
    setIsAuthenticated(false);
    setUsername("");
    return false;
  };

  return {
    isAuthenticated,
    username,
    isLoading,
    login,
    logout,
    checkAuth,
  };
};
