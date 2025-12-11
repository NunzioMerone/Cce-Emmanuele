import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const isAuthenticated = localStorage.getItem("adminAuth") === "true";
  const navigate = useNavigate();

  useEffect(() => {
    console.log("ProtectedRoute - Auth check:", isAuthenticated);
    if (!isAuthenticated) {
      console.log("Non autenticato, redirect a /admin/login");
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
};
