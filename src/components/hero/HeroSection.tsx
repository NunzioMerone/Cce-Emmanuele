import React, { useState, useEffect } from "react";
import { Button } from "../common/Button";
import { scrollToSection } from "../../utils/scrollUtils";

const heroSentences = [
  { text: "Benvenuti nella nostra comunità", delay: 0 },
  { text: "Dove la fede incontra la vita", delay: 600 },
  { text: "Insieme in Cristo", delay: 1200 },
];

export const HeroSection: React.FC = () => {
  const [visibleSentences, setVisibleSentences] = useState<number[]>([]);

  useEffect(() => {
    heroSentences.forEach((sentence, index) => {
      setTimeout(() => {
        setVisibleSentences((prev) => [...prev, index]);
      }, sentence.delay);
    });
  }, []);

  return (
    <section
      id="hero"
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary-900/80 to-primary-700/60" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left: Text */}
          <div className="text-white space-y-6">
            {heroSentences.map((sentence, index) => (
              <h1
                key={index}
                className={`text-4xl md:text-6xl font-bold transition-all duration-1000 ${
                  visibleSentences.includes(index)
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
              >
                {sentence.text}
              </h1>
            ))}
            <p
              className="text-xl md:text-2xl text-gray-200 animate-fade-in"
              style={{ animationDelay: "1.8s", animationFillMode: "both" }}
            >
              Una comunità che vive e condivide l'amore di Cristo
            </p>
          </div>

          {/* Right: CTA */}
          <div
            className="flex justify-center lg:justify-end animate-fade-in"
            style={{ animationDelay: "2.2s", animationFillMode: "both" }}
          >
            <Button
              onClick={() => scrollToSection("where-we-are")}
              variant="secondary"
              size="lg"
              className="shadow-2xl hover:scale-105 transform transition-transform"
            >
              Vieni a trovarci
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
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
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  );
};
