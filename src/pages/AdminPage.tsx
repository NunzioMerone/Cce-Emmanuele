import React, { useState } from "react";
import { AdminLayout } from "../components/admin/AdminLayout";
import { AdminDashboard } from "../components/admin/AdminDashboard";
import { AdminEvents } from "../components/admin/AdminEvents";
import { AdminMinistries } from "../components/admin/AdminMinistries";
import { AdminMission } from "../components/admin/AdminMission";
import { AdminPlaylists } from "../components/admin/AdminPlaylists";
import { AdminHeroImages } from "../components/admin/AdminHeroImages";

export const AdminPage: React.FC = () => {
  const [currentView, setCurrentView] = useState<
    "dashboard" | "events" | "ministries" | "playlists" | "mission" | "hero"
  >("dashboard");

  const renderContent = () => {
    switch (currentView) {
      case "dashboard":
        return <AdminDashboard onNavigate={setCurrentView} />;
      case "events":
        return <AdminEvents />;
      case "ministries":
        return <AdminMinistries />;
      case "playlists":
        return <AdminPlaylists />;
      case "mission":
        return <AdminMission />;
      case "hero":
        return <AdminHeroImages />;
      default:
        return <AdminDashboard onNavigate={setCurrentView} />;
    }
  };

  return (
    <AdminLayout currentView={currentView} onViewChange={setCurrentView}>
      {renderContent()}
    </AdminLayout>
  );
};
