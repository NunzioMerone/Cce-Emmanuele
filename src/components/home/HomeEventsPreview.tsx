import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Event } from "../../types/events";
import { storage } from "../../utils/storageUtils";
import { eventsMock } from "../../utils/eventsMock";

export const HomeEventsPreview: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = storage.getEvents();
    const all = stored || eventsMock;
    const upcoming = all
      .filter((event) => new Date(event.date) >= new Date())
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(0, 3);
    setEvents(upcoming);
  }, []);

  const handleEventClick = (eventId: string) => {
    navigate(`/eventi?id=${eventId}`);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {events.map((event, index) => (
        <div
          key={event.id}
          onClick={() => handleEventClick(event.id)}
          className="group bg-white rounded-xl overflow-hidden border border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all duration-300 cursor-pointer animate-slide-up"
          style={{
            animationDelay: `${index * 100}ms`,
            animationFillMode: "both",
          }}
        >
          <div className="bg-gradient-to-br from-blue-400 to-blue-500 p-5 text-white">
            <div className="text-3xl font-bold mb-1">
              {new Date(event.date).getDate()}
            </div>
            <div className="text-xs uppercase tracking-wide opacity-90">
              {new Date(event.date).toLocaleDateString("it-IT", {
                month: "long",
              })}
            </div>
          </div>
          <div className="p-5">
            <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
              {event.title}
            </h3>
            {event.guest && (
              <p className="text-sm text-blue-500 mb-3">con {event.guest}</p>
            )}
            <p className="text-sm text-gray-600 line-clamp-2 mb-3">
              {event.description}
            </p>
            <div className="flex items-center text-blue-600 font-medium text-sm">
              <span>Scopri di più</span>
              <svg
                className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
