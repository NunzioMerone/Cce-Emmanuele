import React, { useState, useEffect } from "react";
import { SectionTitle } from "../common/SectionTitle";
import { Card } from "../common/Card";
import { Event } from "../../types/events";
import { eventsMock } from "../../utils/eventsMock";
import { storage } from "../../utils/storageUtils";

export const EventsSection: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const stored = storage.getEvents();
    const allEvents = stored || eventsMock;
    const upcomingEvents = allEvents
      .filter((event) => new Date(event.date) >= new Date())
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    setEvents(upcomingEvents);
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("it-IT", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);
  };

  return (
    <section
      id="events"
      className="py-24 bg-gradient-to-b from-primary-50 to-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="Prossimi Eventi"
          subtitle="Unisciti a noi nei nostri eventi e celebrazioni"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <Card
              key={event.id}
              hover
              className="animate-slide-up"
              style={{
                animationDelay: `${index * 100}ms`,
                animationFillMode: "both",
              }}
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-16 h-16 bg-primary-600 rounded-lg flex flex-col items-center justify-center text-white mr-4 flex-shrink-0">
                    <span className="text-2xl font-bold">
                      {new Date(event.date).getDate()}
                    </span>
                    <span className="text-xs uppercase">
                      {new Date(event.date).toLocaleDateString("it-IT", {
                        month: "short",
                      })}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      {event.title}
                    </h3>
                    {event.guest && (
                      <p className="text-sm text-primary-600 font-medium mt-1">
                        con {event.guest}
                      </p>
                    )}
                  </div>
                </div>
                <p className="text-gray-600 mb-4">{event.description}</p>
                <div className="flex items-center text-sm text-gray-500">
                  <svg
                    className="w-4 h-4 mr-2"
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
                  {formatDate(event.date)}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {events.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              Nessun evento programmato al momento. Torna presto per
              aggiornamenti!
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
