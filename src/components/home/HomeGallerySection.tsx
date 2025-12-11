import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../common/Button";

export const HomeGallerySection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Images */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="h-64 rounded-2xl overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-500">
                  <img
                    src="/foto1.png"
                    alt="Chiesa Emmanuele"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="h-48 rounded-2xl overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-500">
                  <img
                    src="/foto2.png"
                    alt="Comunità"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="space-y-4 mt-12">
                <div className="h-48 rounded-2xl overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-500">
                  <img
                    src="/foto3.png"
                    alt="Eventi"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="h-64 rounded-2xl overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-500">
                  <img
                    src="/foto4.jpg"
                    alt="Adorazione"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right: Content */}
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Una Comunità Accogliente
            </h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Siamo una famiglia di credenti che si riunisce per adorare Dio,
              studiare la Sua Parola e vivere in comunione fraterna. Ogni
              domenica e mercoledì le nostre porte sono aperte per accoglierti.
            </p>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Non importa da dove vieni o qual è la tua storia: qui troverai un
              luogo sicuro dove crescere nella fede e costruire relazioni
              autentiche.
            </p>
            <div className="space-y-4 mb-8">
              <div className="flex items-start">
                <svg
                  className="w-6 h-6 text-blue-600 mr-3 flex-shrink-0 mt-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    Culti Domenicali
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Ogni domenica alle 10:30 - Lode, predicazione e comunione
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <svg
                  className="w-6 h-6 text-blue-600 mr-3 flex-shrink-0 mt-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    Studio Biblico
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Ogni giovedì alle 18:00 o 20:00 - Approfondimenti sulla
                    Parola
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={() => navigate("/chi-siamo")}
                variant="primary"
                size="md"
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg"
              >
                Scopri di Più
              </Button>
              <Button
                onClick={() =>
                  window.open(
                    "https://www.google.com/maps/search/?api=1&query=Via+Gaetano+de+Rosa+81",
                    "_blank"
                  )
                }
                variant="outline"
                size="md"
              >
                Come Raggiungerci
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
