import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useAdminAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Controlla se l'utente è autenticato
    const auth = localStorage.getItem("adminAuth");
    setIsAuthenticated(auth === "true");
  }, []);

  const login = () => {
    localStorage.setItem("adminAuth", "true");
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("adminAuth");
    setIsAuthenticated(false);
    navigate("/admin/login");
  };

  return {
    isAuthenticated,
    login,
    logout,
  };
};
