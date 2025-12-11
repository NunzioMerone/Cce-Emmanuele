import React from "react";
import { SectionTitle } from "../common/SectionTitle";
import { Button } from "../common/Button";

const locationInfo = {
  title: "Vieni a trovarci",
  description:
    "Siamo situati nel cuore di Roma, facilmente raggiungibili con i mezzi pubblici. La nostra chiesa è un luogo accogliente dove tutti sono benvenuti.",
  mapUrl:
    "https://www.google.com/maps?hl=en&gl=it&um=1&ie=UTF-8&fb=1&sa=X&ftid=0x133b135d2cb01947:0xfed9a3d71c9e0d81",
  embedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2969.6551208488896!2d12.4963655!3d41.9027835!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x133b135d2cb01947%3A0xfed9a3d71c9e0d81!2sRoma%2C%20Italia!5e0!3m2!1sit!2sit!4v1234567890",
  features: [
    "Parcheggio convenzionato disponibile",
    "Spazio per bambini con monitori",
    "Accessibile per persone con disabilità",
    "Wi-Fi gratuito",
  ],
};

export const WhereWeAreSection: React.FC = () => {
  return (
    <section id="where-we-are" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title={locationInfo.title}
          subtitle={locationInfo.description}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Map */}
          <div className="rounded-2xl overflow-hidden shadow-xl h-96 lg:h-full">
            <iframe
              src={locationInfo.embedUrl}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "400px" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Mappa della chiesa"
            />
          </div>

          {/* Info */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Informazioni Utili
              </h3>
              <ul className="space-y-4">
                {locationInfo.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <svg
                      className="w-6 h-6 text-primary-600 mr-3 flex-shrink-0 mt-0.5"
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
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-primary-600 rounded-2xl shadow-lg p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Orari dei Culti</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Domenica</span>
                  <span>10:30 - 12:00</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Mercoledì</span>
                  <span>19:30 - 21:00</span>
                </div>
              </div>
            </div>

            <Button
              onClick={() => window.open(locationInfo.mapUrl, "_blank")}
              variant="primary"
              size="lg"
              className="w-full"
            >
              Apri in Google Maps
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
