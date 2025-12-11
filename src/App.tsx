import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AppRoutes } from "./router/routes";
import { HomePage } from "./pages/HomePage";
import { MinistriesPage } from "./pages/MinistriesPage";
import { EventsPage } from "./pages/EventsPage";
import { MediaPage } from "./pages/MediaPage";
import { AboutPage } from "./pages/AboutPage";
import { ContactPage } from "./pages/ContactPage";
import { AdminLoginPage } from "./pages/AdminLoginPage";
import { AdminPage } from "./pages/AdminPage";
import { ProtectedRoute } from "./components/admin/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/ministeri" element={<MinistriesPage />} />
      <Route path="/eventi" element={<EventsPage />} />
      <Route path="/media" element={<MediaPage />} />
      <Route path="/chi-siamo" element={<AboutPage />} />
      <Route path="/contatti" element={<ContactPage />} />
      <Route path="/admin/login" element={<AdminLoginPage />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminPage />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
