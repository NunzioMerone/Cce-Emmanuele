import React, { useState, useEffect } from "react";
import { storage } from "../../utils/storageUtils";
import { eventsMock } from "../../utils/eventsMock";
import { ministriesMock } from "../../utils/ministriesMock";
import { playlistsMock } from "../../utils/playlistsMock";

interface AdminDashboardProps {
  onNavigate: (view: "events" | "ministries" | "playlists") => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  onNavigate,
}) => {
  const [stats, setStats] = useState({
    events: 0,
    ministries: 0,
    playlists: 0,
  });

  useEffect(() => {
    // Load stats
    const events = storage.getEvents() || eventsMock;
    const ministries = storage.getMinistries() || ministriesMock;
    const playlists = storage.getPlaylists() || playlistsMock;

    setStats({
      events: events.length,
      ministries: ministries.length,
      playlists: playlists.length,
    });
  }, []);

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Eventi Card */}
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm font-medium mb-1">Eventi</p>
              <p className="text-4xl font-bold">{stats.events}</p>
            </div>
            <div className="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center">
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Ministeri Card */}
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm font-medium mb-1">
                Ministeri
              </p>
              <p className="text-4xl font-bold">{stats.ministries}</p>
            </div>
            <div className="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center">
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Playlist Card */}
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm font-medium mb-1">
                Playlist
              </p>
              <p className="text-4xl font-bold">{stats.playlists}</p>
            </div>
            <div className="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center">
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Azioni Rapide</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <button
            onClick={() => onNavigate("events")}
            className="flex items-center p-4 bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all"
          >
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
              <svg
                className="w-6 h-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </div>
            <div className="text-left">
              <p className="font-semibold text-gray-900">Nuovo Evento</p>
              <p className="text-sm text-gray-500">Aggiungi un evento</p>
            </div>
          </button>

          <button
            onClick={() => onNavigate("ministries")}
            className="flex items-center p-4 bg-white rounded-xl border border-gray-200 hover:border-green-300 hover:shadow-md transition-all"
          >
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
              <svg
                className="w-6 h-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </div>
            <div className="text-left">
              <p className="font-semibold text-gray-900">Nuovo Ministero</p>
              <p className="text-sm text-gray-500">Aggiungi un ministero</p>
            </div>
          </button>

          <button
            onClick={() => onNavigate("playlists")}
            className="flex items-center p-4 bg-white rounded-xl border border-gray-200 hover:border-purple-300 hover:shadow-md transition-all"
          >
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
              <svg
                className="w-6 h-6 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </div>
            <div className="text-left">
              <p className="font-semibold text-gray-900">Nuova Playlist</p>
              <p className="text-sm text-gray-500">Aggiungi una playlist</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
