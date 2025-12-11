import React, { useEffect } from "react";
import { Ministry } from "../../types/ministries";

interface MinistryModalProps {
  ministry: Ministry | null;
  onClose: () => void;
}

export const MinistryModal: React.FC<MinistryModalProps> = ({
  ministry,
  onClose,
}) => {
  useEffect(() => {
    if (ministry) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [ministry]);

  if (!ministry) return null;

  return (
    <div className="fixed inset-0 z-[100] animate-fade-in">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal sliding from top */}
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

            {/* Image header */}
            <div className="relative h-80 bg-gradient-to-br from-blue-50 to-blue-100 overflow-hidden rounded-t-3xl">
              <img
                src={ministry.image}
                alt={ministry.title}
                className="w-full h-full object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute bottom-8 left-8 right-8">
                <h2 className="text-4xl font-black text-white mb-2">
                  {ministry.title}
                </h2>
                {ministry.schedule && (
                  <div className="flex items-center text-white/90 text-lg">
                    <svg
                      className="w-5 h-5 mr-2"
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
                    {ministry.schedule}
                  </div>
                )}
              </div>
            </div>

            {/* Content */}
            <div className="p-8 md:p-12">
              <div className="prose prose-lg max-w-none">
                <p className="text-xl text-gray-700 leading-relaxed mb-6">
                  {ministry.fullDescription || ministry.description}
                </p>

                {/* Dynamic details based on ministry */}
                {(ministry.id === "1" ||
                  ministry.id === "4" ||
                  ministry.id === "5" ||
                  ministry.id === "6") && (
                  <div className="mt-8 space-y-6">
                    <h3 className="text-2xl font-bold text-gray-900">
                      Cosa Facciamo
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                            />
                          </svg>
                        </div>
                        <h4 className="font-bold text-gray-900 mb-2">
                          Comunione
                        </h4>
                        <p className="text-gray-600 text-sm">
                          Momenti di condivisione e crescita insieme nella fede
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
                              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                            />
                          </svg>
                        </div>
                        <h4 className="font-bold text-gray-900 mb-2">Studio</h4>
                        <p className="text-gray-600 text-sm">
                          Approfondimento della Parola di Dio e applicazione
                          pratica
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Additional details section */}
                {ministry.id === "2" && (
                  <div className="mt-8 space-y-6">
                    <h3 className="text-2xl font-bold text-gray-900">
                      Dettagli Aggiuntivi
                    </h3>
                    <div className="bg-blue-50 rounded-xl p-6">
                      <h4 className="font-bold text-gray-900 mb-2">
                        Attività per Bambini
                      </h4>
                      <p className="text-gray-600 text-sm">
                        Offriamo attività ricreative e formative per bambini
                        durante gli incontri.
                      </p>
                    </div>
                  </div>
                )}

                {ministry.id === "3" && (
                  <div className="mt-8 space-y-6">
                    <h3 className="text-2xl font-bold text-gray-900">
                      Dettagli Aggiuntivi
                    </h3>
                    <div className="bg-blue-50 rounded-xl p-6">
                      <h4 className="font-bold text-gray-900 mb-2">
                        Supporto Missionario
                      </h4>
                      <p className="text-gray-600 text-sm">
                        Sosteniamo attivamente le missioni locali e
                        internazionali.
                      </p>
                    </div>
                  </div>
                )}

                {ministry.id === "7" && (
                  <div className="mt-8 space-y-6">
                    <h3 className="text-2xl font-bold text-gray-900">
                      Dettagli Aggiuntivi
                    </h3>
                    <div className="bg-blue-50 rounded-xl p-6">
                      <h4 className="font-bold text-gray-900 mb-2">
                        Gruppi di Studio Biblico
                      </h4>
                      <p className="text-gray-600 text-sm">
                        Organizziamo gruppi di studio biblico per approfondire
                        la fede.
                      </p>
                    </div>
                  </div>
                )}

                {/* Call to action section */}
                <div className="bg-gradient-to-r from-gold-500 to-gold-600 rounded-2xl p-8 text-white mt-8">
                  <h3 className="text-2xl font-bold mb-4">
                    Vuoi Unirti a Noi?
                  </h3>
                  <p className="text-gold-50 mb-6">
                    Siamo sempre felici di accogliere nuovi membri nella nostra
                    comunità. Contattaci per maggiori informazioni!
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
    </div>
  );
};
