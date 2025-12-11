import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { PageLayout } from "../components/layout/PageLayout";
import { Event } from "../types/events";
import { storage } from "../utils/storageUtils";
import { eventsMock } from "../utils/eventsMock";
import { EventModal } from "../components/common/EventModal";

export const EventsPage: React.FC = () => {
  const [allEvents, setAllEvents] = useState<Event[]>([]);
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
  const [futureEvents, setFutureEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [activeFilter, setActiveFilter] = useState<"upcoming" | "all">(
    "upcoming"
  );
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const stored = storage.getEvents();
    const events = stored || eventsMock;

    const now = new Date();
    const oneMonthFromNow = new Date();
    oneMonthFromNow.setMonth(oneMonthFromNow.getMonth() + 1);

    // Eventi entro 1 mese
    const upcoming = events
      .filter((event) => {
        const eventDate = new Date(event.date);
        return eventDate >= now && eventDate <= oneMonthFromNow;
      })
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    // Eventi oltre 1 mese
    const future = events
      .filter((event) => new Date(event.date) > oneMonthFromNow)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    setAllEvents(events);
    setUpcomingEvents(upcoming);
    setFutureEvents(future);

    const eventId = searchParams.get("id");
    if (eventId) {
      const event = events.find((e) => e.id === eventId);
      if (event) {
        setSelectedEvent(event);
      }
    }
  }, [searchParams]);

  return (
    <PageLayout>
      {/* Hero Section */}
      <div className="relative pt-24 pb-32 bg-gradient-to-br from-blue-600 via-blue-500 to-purple-600 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl animate-float"></div>
          <div
            className="absolute bottom-20 right-10 w-96 h-96 bg-white rounded-full blur-3xl animate-float"
            style={{ animationDelay: "2s" }}
          ></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-white mb-6 animate-fade-in">
            Eventi
          </h1>
          <p
            className="text-xl text-white/90 max-w-3xl mx-auto animate-fade-in"
            style={{ animationDelay: "0.2s", animationFillMode: "both" }}
          >
            Scopri tutti i nostri prossimi appuntamenti e celebrazioni
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10 pb-20">
        {/* Filter Tabs */}
        <div className="flex justify-center mb-12 animate-slide-up">
          <div className="bg-white rounded-2xl p-2 shadow-xl border border-gray-200 inline-flex gap-2">
            <button
              onClick={() => setActiveFilter("upcoming")}
              className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${
                activeFilter === "upcoming"
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg scale-105"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Prossimi Eventi
                {upcomingEvents.length > 0 && (
                  <span
                    className={`ml-2 px-2 py-0.5 rounded-full text-xs font-bold ${
                      activeFilter === "upcoming"
                        ? "bg-white/30"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {upcomingEvents.length}
                  </span>
                )}
              </div>
            </button>
            <button
              onClick={() => setActiveFilter("all")}
              className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${
                activeFilter === "all"
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg scale-105"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5"
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
                Tutti gli Eventi
                <span
                  className={`ml-2 px-2 py-0.5 rounded-full text-xs font-bold ${
                    activeFilter === "all"
                      ? "bg-white/30"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {allEvents.length}
                </span>
              </div>
            </button>
          </div>
        </div>

        {/* Prossimi Eventi (entro 1 mese) */}
        {activeFilter === "upcoming" && upcomingEvents.length > 0 && (
          <div className="animate-fade-in">
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
                In Arrivo Presto
              </h2>
              <p className="text-base text-gray-600">
                Eventi dei prossimi 30 giorni
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {upcomingEvents.map((event, index) => (
                <div
                  key={event.id}
                  onClick={() => setSelectedEvent(event)}
                  className="group relative bg-white rounded-3xl overflow-hidden border border-gray-100 hover:border-blue-200 hover:shadow-2xl transition-all duration-500 cursor-pointer animate-slide-up"
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animationFillMode: "both",
                  }}
                >
                  {/* Date Badge con effetto 3D */}
                  <div className="relative bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 p-6 text-white overflow-hidden">
                    <div className="absolute inset-0 bg-black/10 transform -skew-y-3 group-hover:skew-y-0 transition-transform duration-500"></div>
                    <div className="relative z-10">
                      <div className="text-5xl font-black mb-1 group-hover:scale-110 transition-transform duration-300 inline-block">
                        {new Date(event.date).getDate()}
                      </div>
                      <div className="text-sm uppercase tracking-widest opacity-90 font-medium">
                        {new Date(event.date).toLocaleDateString("it-IT", {
                          month: "long",
                        })}
                      </div>
                    </div>
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {event.title}
                    </h3>
                    {event.guest && (
                      <p className="text-sm text-blue-600 mb-3 font-medium">
                        con {event.guest}
                      </p>
                    )}
                    <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                      {event.description}
                    </p>

                    <div className="flex items-center text-blue-600 font-medium text-sm group-hover:gap-2 transition-all duration-300">
                      <span>Scopri di più</span>
                      <svg
                        className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
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

                  {/* Bottom decoration with animated gradient */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-700 ease-out"></div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tutti gli Eventi */}
        {activeFilter === "all" && (
          <div className="animate-fade-in">
            <div className="mb-8 text-center">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
                Calendario Completo
              </h2>
              <p className="text-lg text-gray-600">
                Tutti i nostri eventi programmati
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[...upcomingEvents, ...futureEvents].map((event, index) => (
                <div
                  key={event.id}
                  onClick={() => setSelectedEvent(event)}
                  className="group relative bg-white rounded-3xl overflow-hidden border border-gray-100 hover:border-blue-200 hover:shadow-2xl transition-all duration-500 cursor-pointer animate-slide-up"
                  style={{
                    animationDelay: `${index * 50}ms`,
                    animationFillMode: "both",
                  }}
                >
                  <div className="relative bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 p-6 text-white overflow-hidden">
                    <div className="absolute inset-0 bg-black/10 transform -skew-y-3 group-hover:skew-y-0 transition-transform duration-500"></div>
                    <div className="relative z-10">
                      <div className="text-5xl font-black mb-1 group-hover:scale-110 transition-transform duration-300 inline-block">
                        {new Date(event.date).getDate()}
                      </div>
                      <div className="text-sm uppercase tracking-widest opacity-90 font-medium">
                        {new Date(event.date).toLocaleDateString("it-IT", {
                          month: "long",
                        })}
                      </div>
                    </div>
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {event.title}
                    </h3>
                    {event.guest && (
                      <p className="text-sm text-blue-600 mb-3 font-medium">
                        con {event.guest}
                      </p>
                    )}
                    <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                      {event.description}
                    </p>

                    <div className="flex items-center text-blue-600 font-medium text-sm group-hover:gap-2 transition-all duration-300">
                      <span>Scopri di più</span>
                      <svg
                        className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
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

                  {/* Bottom decoration with animated gradient */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-700 ease-out"></div>
                </div>
              ))}
            </div>
          </div>
        )}

        {upcomingEvents.length === 0 && futureEvents.length === 0 && (
          <div className="text-center py-20 bg-white rounded-2xl shadow-lg">
            <div className="text-6xl mb-4">📅</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Nessun evento programmato
            </h3>
            <p className="text-gray-600">
              Torna presto per scoprire i prossimi appuntamenti!
            </p>
          </div>
        )}
      </div>

      <EventModal
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
      />
    </PageLayout>
  );
};
