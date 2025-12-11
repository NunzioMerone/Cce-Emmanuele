import React, { useEffect } from "react";
import { Event } from "../../types/events";

interface EventModalProps {
  event: Event | null;
  onClose: () => void;
}

export const EventModal: React.FC<EventModalProps> = ({ event, onClose }) => {
  useEffect(() => {
    if (event) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [event]);

  if (!event) return null;

  return (
    <div className="fixed inset-0 z-[100] animate-fade-in">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-x-0 top-0 max-h-[90vh] overflow-y-auto animate-slide-down">
        <div className="min-h-screen flex items-start justify-center p-4 pt-20">
          <div
            className="relative bg-white rounded-3xl shadow-2xl w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full bg-gray-100 hover:bg-blue-500 transition-colors z-10 group"
            >
              <svg
                className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Date header */}
            <div className="relative bg-gradient-to-br from-blue-500 to-blue-600 p-8 rounded-t-3xl">
              <div className="text-white">
                <div className="text-6xl font-black mb-2">
                  {new Date(event.date).getDate()}
                </div>
                <div className="text-xl uppercase tracking-wide opacity-90">
                  {new Date(event.date).toLocaleDateString("it-IT", {
                    month: "long",
                    year: "numeric",
                  })}
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-8 md:p-12">
              <h2 className="text-4xl font-black text-gray-900 mb-4">
                {event.title}
              </h2>
              {event.guest && (
                <p className="text-xl text-blue-600 font-medium mb-6">
                  con {event.guest}
                </p>
              )}

              <div className="prose prose-lg max-w-none">
                <p className="text-xl text-gray-700 leading-relaxed mb-8">
                  {event.fullDescription || event.description}
                </p>
              </div>

              {/* Info cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                <div className="bg-blue-50 rounded-xl p-6">
                  <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-4">
                    <svg
                      className="w-6 h-6 text-white"
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
                  <h4 className="font-bold text-gray-900 mb-2">Data e Ora</h4>
                  <p className="text-gray-600 text-sm">
                    {new Date(event.date).toLocaleDateString("it-IT", {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <div className="bg-blue-50 rounded-xl p-6">
                  <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-4">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                    </svg>
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2">Dove</h4>
                  <p className="text-gray-600 text-sm">
                    Via Gaetano de Rosa 81, Napoli
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-gold-500 to-gold-600 rounded-2xl p-8 text-white mt-8">
                <h3 className="text-2xl font-bold mb-4">Vuoi Partecipare?</h3>
                <p className="text-gold-50 mb-6">
                  Sei il benvenuto! Contattaci per maggiori informazioni
                  sull'evento.
                </p>
                <a
                  href="mailto:centroemmanuele@gmail.com"
                  className="inline-flex items-center gap-2 bg-white text-gold-700 px-6 py-3 rounded-lg font-semibold hover:bg-gold-50 transition-colors"
                >
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
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  Contattaci
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
