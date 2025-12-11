import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { PageLayout } from "../components/layout/PageLayout";
import { Ministry } from "../types/ministries";
import { storage } from "../utils/storageUtils";
import { ministriesMock } from "../utils/ministriesMock";
import { MinistryModal } from "../components/common/MinistryModal";

export const MinistriesPage: React.FC = () => {
  const [ministries, setMinistries] = useState<Ministry[]>([]);
  const [selectedMinistry, setSelectedMinistry] = useState<Ministry | null>(
    null
  );
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const stored = storage.getMinistries();
    const allMinistries = stored || ministriesMock;
    setMinistries(allMinistries);

    const ministryId = searchParams.get("id");
    if (ministryId) {
      const ministry = allMinistries.find((m) => m.id === ministryId);
      if (ministry) {
        setSelectedMinistry(ministry);
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
            I Nostri Ministeri
          </h1>
          <p
            className="text-xl text-white/90 max-w-3xl mx-auto animate-fade-in"
            style={{ animationDelay: "0.2s", animationFillMode: "both" }}
          >
            Scopri come puoi servire e crescere nella fede insieme alla nostra
            comunità
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10 pb-20">
        {/* Info Card */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 mb-12 border-2 border-blue-200 shadow-lg animate-slide-up">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <svg
                className="w-7 h-7 text-white"
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
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Trova il Tuo Posto
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Ogni ministero è un'opportunità per usare i tuoi doni e talenti
                per servire Dio e gli altri. Clicca su un ministero per scoprire
                di più e come puoi unirti!
              </p>
            </div>
          </div>
        </div>

        {/* Ministries Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {ministries.map((ministry, index) => (
            <div
              key={ministry.id}
              onClick={() => setSelectedMinistry(ministry)}
              className="group bg-white rounded-2xl overflow-hidden border-2 border-gray-100 hover:border-blue-300 hover:shadow-2xl transition-all duration-500 cursor-pointer animate-slide-up"
              style={{
                animationDelay: `${index * 100}ms`,
                animationFillMode: "both",
              }}
            >
              {/* Image with overlay */}
              <div className="relative h-64 bg-gradient-to-br from-blue-50 to-purple-50 overflow-hidden">
                <img
                  src={ministry.image}
                  alt={ministry.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                {/* Schedule badge */}
                {ministry.schedule && (
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg">
                    <div className="flex items-center text-sm">
                      <svg
                        className="w-4 h-4 mr-1 text-blue-600"
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
                      <span className="font-semibold text-gray-700">
                        {ministry.schedule.split("•")[0].trim()}
                      </span>
                    </div>
                  </div>
                )}

                {/* Title overlay */}
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-3xl font-bold text-white drop-shadow-lg">
                    {ministry.title}
                  </h3>
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                <p className="text-gray-600 leading-relaxed mb-6">
                  {ministry.description}
                </p>

                {/* CTA */}
                <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                  <div className="flex items-center text-blue-600 font-semibold">
                    <span>Scopri di più</span>
                    <svg
                      className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform"
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
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-500 transition-colors">
                    <svg
                      className="w-5 h-5 text-blue-600 group-hover:text-white transition-colors"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <MinistryModal
        ministry={selectedMinistry}
        onClose={() => setSelectedMinistry(null)}
      />
    </PageLayout>
  );
};
