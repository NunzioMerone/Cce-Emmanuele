import React from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  // TEMPORANEO: Autenticazione disabilitata per debug
  // Permetti sempre l'accesso
  return <>{children}</>;
};
