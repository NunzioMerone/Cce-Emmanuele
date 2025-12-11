import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PageLayout } from "../components/layout/PageLayout";
import { Button } from "../components/common/Button";
import { Mission } from "../types/mission";
import { storage } from "../utils/storageUtils";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

const defaultMission: Mission = {
  id: "1",
  content: `La nostra missione è quella di essere una comunità di credenti che ama Dio con tutto il cuore e il prossimo come se stessi. Cerchiamo di vivere secondo gli insegnamenti di Gesù Cristo, proclamando il Vangelo e facendo discepoli in tutte le nazioni.

Crediamo che ogni persona sia preziosa agli occhi di Dio e abbia bisogno di conoscere l'amore redentore di Cristo.`,
  verses: [
    {
      text: "Andate dunque e fate miei discepoli tutti i popoli battezzandoli nel nome del Padre, del Figlio e dello Spirito Santo",
      reference: "Matteo 28:19-20",
    },
    {
      text: "Ama il Signore Dio tuo con tutto il tuo cuore, con tutta la tua anima e con tutta la tua mente",
      reference: "Matteo 22:37-39",
    },
  ],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

export const AboutPage: React.FC = () => {
  const [mission, setMission] = useState<Mission>(defaultMission);
  const navigate = useNavigate();
  const missionSection = useScrollAnimation();
  const versesSection = useScrollAnimation();
  const gallerySection = useScrollAnimation();
  const locationSection = useScrollAnimation();
  const valuesSection = useScrollAnimation();

  useEffect(() => {
    const stored = storage.getMission();
    if (stored) setMission(stored);
  }, []);

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
            Chi Siamo
          </h1>
          <p
            className="text-xl text-white/90 max-w-3xl mx-auto animate-fade-in"
            style={{ animationDelay: "0.2s", animationFillMode: "both" }}
          >
            La nostra storia, missione e valori che ci guidano ogni giorno
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10 pb-20">
        {/* Gallery Section con foto sfalsate */}
        <section ref={gallerySection.ref} className="mb-16">
          <div
            className={`transition-all duration-1000 ${
              gallerySection.isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Right: Images sfalsate */}
              <div className="order-2 lg:order-1">
                <div className="relative h-[600px]">
                  {/* Foto principale grande */}
                  <div className="absolute top-0 left-0 w-3/5 h-3/5 rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition-all duration-500 z-10">
                    <img
                      src="/hero5.jpg"
                      alt="Chiesa Emmanuele"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Foto piccola in alto a destra */}
                  <div className="absolute top-12 right-0 w-2/5 h-2/5 rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition-all duration-500 z-20">
                    <img
                      src="/foto2.png"
                      alt="Comunità"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Foto media in basso a sinistra */}
                  <div className="absolute bottom-0 left-12 w-2/5 h-2/5 rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition-all duration-500 z-20">
                    <img
                      src="/foto1.png"
                      alt="Eventi"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Decorative elements */}
                  <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-blue-100 rounded-full blur-2xl -z-10"></div>
                  <div className="absolute -top-4 -left-4 w-24 h-24 bg-purple-200 rounded-full blur-xl -z-10"></div>
                </div>
              </div>

              {/* Left: Content */}
              <div className="order-1 lg:order-2">
                <div className="inline-flex items-center px-4 py-2 bg-blue-50 rounded-full text-blue-600 font-medium mb-6">
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
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                  La Nostra Storia
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Una Famiglia in Cristo
                </h2>
                <p className="text-base text-gray-600 mb-6 leading-relaxed">
                  Siamo una comunità di credenti che si riunisce per adorare
                  Dio, studiare la Sua Parola e vivere in comunione fraterna.
                  Fondata con l'obiettivo di portare il messaggio del Vangelo
                  nella nostra città.
                </p>
                <p className="text-base text-gray-600 mb-8 leading-relaxed">
                  Ogni persona che entra dalle nostre porte trova un luogo
                  sicuro dove crescere nella fede, costruire relazioni
                  autentiche e scoprire il proprio scopo in Cristo.
                </p>
                <div className="flex flex-wrap gap-4 mb-8">
                  <div className="flex items-center gap-3 bg-gradient-to-r from-blue-50 to-blue-100 px-6 py-4 rounded-xl border border-blue-200">
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
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
                    <div>
                      <div className="text-3xl font-bold text-gray-900">
                        80+
                      </div>
                      <div className="text-sm text-gray-600">Membri</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-gradient-to-r from-purple-50 to-purple-100 px-6 py-4 rounded-xl border border-purple-200">
                    <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
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
                    <div>
                      <div className="text-3xl font-bold text-gray-900">
                        15+
                      </div>
                      <div className="text-sm text-gray-600">Anni</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section ref={valuesSection.ref} className="mb-16">
          <div
            className={`transition-all duration-1000 ${
              valuesSection.isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                I Nostri Valori
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-600 mx-auto rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-8 border border-blue-100 hover:shadow-xl transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-6 shadow-lg">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Amore</h3>
                <p className="text-gray-600 leading-relaxed">
                  Amare Dio sopra ogni cosa e il prossimo come noi stessi,
                  dimostrando compassione e accoglienza a tutti.
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-white rounded-2xl p-8 border border-purple-100 hover:shadow-xl transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-6 shadow-lg">
                  <svg
                    className="w-8 h-8 text-white"
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
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  Verità
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Studiare e vivere secondo la Parola di Dio, fondamento
                  immutabile della nostra fede e guida quotidiana.
                </p>
              </div>

              <div className="bg-gradient-to-br from-gold-50 to-white rounded-2xl p-8 border border-gold-100 hover:shadow-xl transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-gold-500 to-gold-600 rounded-xl flex items-center justify-center mb-6 shadow-lg">
                  <svg
                    className="w-8 h-8 text-white"
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
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  Comunità
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Crescere insieme come famiglia spirituale, sostenendoci
                  reciprocamente nel cammino di fede.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Mission */}
        <section ref={missionSection.ref} className="mb-16">
          <div
            className={`bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-10 border-2 border-blue-200 shadow-xl transition-all duration-1000 ${
              missionSection.isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                La Nostra Missione
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-600 mx-auto rounded-full"></div>
            </div>
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed whitespace-pre-line text-center">
              {mission.content}
            </div>
          </div>
        </section>

        {/* Bible Verses */}
        <section ref={versesSection.ref} className="mb-16">
          <div
            className={`space-y-8 transition-all duration-1000 ${
              versesSection.isVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            {mission.verses.map((verse, index) => (
              <div
                key={index}
                className="relative bg-white rounded-3xl p-10 shadow-xl border-2 border-gray-100 overflow-hidden group hover:shadow-2xl hover:border-blue-200 transition-all duration-500"
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-blue-400 to-purple-600 transform scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top"></div>
                <div className="relative pl-6">
                  <div className="text-6xl text-blue-100 font-serif mb-4 leading-none">
                    "
                  </div>
                  <p className="text-xl text-gray-800 italic mb-6 leading-relaxed">
                    {verse.text}
                  </p>
                  <p className="text-blue-600 font-bold text-lg">
                    — {verse.reference}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Location */}
        <section ref={locationSection.ref}>
          <div
            className={`bg-white rounded-3xl overflow-hidden border-2 border-gray-100 shadow-2xl transition-all duration-1000 ${
              locationSection.isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <div className="p-10">
              <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">
                Dove Siamo
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="flex items-start gap-4 p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl border border-blue-200">
                  <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
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
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Indirizzo</h3>
                    <p className="text-gray-600 text-sm">
                      Via Gaetano de Rosa 81, Napoli
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl border border-purple-200">
                  <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center flex-shrink-0">
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
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Email</h3>
                    <a
                      href="mailto:centroemmanuele@gmail.com"
                      className="text-purple-600 text-sm hover:underline"
                    >
                      centroemmanuele@gmail.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-6 bg-gradient-to-br from-gold-50 to-gold-100 rounded-2xl border border-gold-200">
                  <div className="w-12 h-12 bg-gold-500 rounded-xl flex items-center justify-center flex-shrink-0">
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
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">
                      Orari Culti
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Dom 10:30 | Mer 19:30
                    </p>
                  </div>
                </div>
              </div>
              <Button
                onClick={() => navigate("/contatti")}
                variant="primary"
                size="lg"
                className="w-full mb-6"
              >
                Contattaci Ora
              </Button>
            </div>
            <div
              className="h-96 bg-gray-100 cursor-pointer hover:opacity-90 transition-opacity relative group"
              onClick={() =>
                window.open(
                  "https://www.google.com/maps/search/?api=1&query=Via+Gaetano+de+Rosa+81,+Napoli",
                  "_blank"
                )
              }
            >
              <div className="absolute inset-0 bg-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity z-10 flex items-center justify-center">
                <div className="bg-white rounded-full px-6 py-3 font-semibold text-gray-900 shadow-xl">
                  Apri in Google Maps →
                </div>
              </div>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3019.2918407776867!2d14.266987!3d40.835842!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x133b0f1e7b5d8f89%3A0x6e8e9c7d8e5f6d7e!2sVia%20Gaetano%20de%20Rosa%2C%2081%2C%20Napoli%2C%20NA!5e0!3m2!1sit!2sit!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                title="Mappa della chiesa"
              />
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  );
};
