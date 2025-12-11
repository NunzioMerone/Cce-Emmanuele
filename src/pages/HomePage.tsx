import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageLayout } from "../components/layout/PageLayout";
import { Button } from "../components/common/Button";
import { HomeHero } from "../components/home/HomeHero";

import { useScrollAnimation } from "../hooks/useScrollAnimation";
import { HomeEventsPreview } from "../components/home/HomeEventsPreview";
import { HomeGallerySection } from "../components/home/HomeGallerySection";
import { HomeMediaPreview } from "../components/home/HomeMediaPreview";
import { HomeMinistriesPreview } from "../components/home/HomeMinistriesPreview";
import { MediaItem, extractYouTubeId } from "../types/media";

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedVideo, setSelectedVideo] = useState<MediaItem | null>(null);
  const ministriesSection = useScrollAnimation();
  const eventsSection = useScrollAnimation();
  const mediaSection = useScrollAnimation();
  const gallerySection = useScrollAnimation();
  const ctaSection = useScrollAnimation();

  return (
    <PageLayout>
      <HomeHero />

      {/* Ministeri Preview */}
      <section ref={ministriesSection.ref} className="py-20 bg-white">
        <div
          className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-1000 ${
            ministriesSection.isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                I Nostri Ministeri
              </h2>
              <p className="text-gray-600">
                Scopri come essere parte attiva della comunità
              </p>
            </div>
            <Button
              onClick={() => navigate("/ministeri")}
              variant="outline"
              size="sm"
            >
              Vedi tutti
            </Button>
          </div>
          <HomeMinistriesPreview />
        </div>
      </section>

      {/* Gallery Section */}
      <section ref={gallerySection.ref}>
        <div
          className={`transition-all duration-1000 ${
            gallerySection.isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <HomeGallerySection />
        </div>
      </section>

      {/* Eventi Preview */}
      <section
        ref={eventsSection.ref}
        className="py-20 bg-gradient-to-b from-gray-50 to-white"
      >
        <div
          className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-1000 ${
            eventsSection.isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Prossimi Eventi
              </h2>
              <p className="text-gray-600">Unisciti alle nostre celebrazioni</p>
            </div>
            <Button
              onClick={() => navigate("/eventi")}
              variant="outline"
              size="sm"
            >
              Vedi tutti
            </Button>
          </div>
          <HomeEventsPreview />
        </div>
      </section>

      {/* Media Preview */}
      <section ref={mediaSection.ref} className="py-20 bg-white">
        <div
          className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-1000 ${
            mediaSection.isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Ultime Predicazioni
              </h2>
              <p className="text-gray-600">Guarda i nostri video</p>
            </div>
            <Button
              onClick={() => navigate("/media")}
              variant="outline"
              size="sm"
            >
              Vedi tutti
            </Button>
          </div>
          <HomeMediaPreview onVideoClick={setSelectedVideo} />
        </div>
      </section>

      {/* CTA Section */}
      <section ref={ctaSection.ref} className="relative py-24 overflow-hidden">
        {/* Gradient sfumato da bianco a blu intenso */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-blue-100 via-30% to-blue-600"></div>

        {/* Layer aggiuntivo per intensificare il blu in basso */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent via-60% to-primary-700/40"></div>

        {/* Pattern decorativo */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE0YzMuMzE0IDAgNi0yLjY4NiA2LTZzLTIuNjg2LTYtNi02LTYgMi42ODYtNiA2IDIuNjg2IDYgNiA2ek0wIDE0YzMuMzE0IDAgNi0yLjY4NiA2LTZzLTIuNjg2LTYtNi02djZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30"></div>

        {/* Floating circles */}
        <div className="absolute top-10 left-10 w-64 h-64 bg-blue-200/30 rounded-full blur-3xl animate-float"></div>
        <div
          className="absolute bottom-10 right-10 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        ></div>

        <div
          className={`relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center transition-all duration-1000 ${
            ctaSection.isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Vieni a Trovarci
          </h2>
          <p className="text-base text-blue-50 mb-8">
            Ogni domenica alle 10:30 e mercoledì alle 19:30
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              onClick={() => navigate("/chi-siamo")}
              variant="primary"
              size="md"
            >
              Scopri di più
            </Button>
            <Button
              onClick={() => navigate("/contatti")}
              variant="secondary"
              size="md"
            >
              Contattaci
            </Button>
          </div>
        </div>
      </section>

      {/* Video Modal - Identico a MediaPage */}
      {selectedVideo && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
          onClick={() => setSelectedVideo(null)}
        >
          {/* Close button */}
          <button
            onClick={() => setSelectedVideo(null)}
            className="absolute top-6 right-6 z-10 p-3 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-sm transition-colors group"
          >
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Video Container - GRANDE */}
          <div
            className="w-full max-w-7xl mx-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="aspect-video bg-black rounded-xl overflow-hidden shadow-2xl">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${extractYouTubeId(
                  selectedVideo.youtubeUrl
                )}?autoplay=1&rel=0`}
                title={selectedVideo.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>

            {/* Video Info sotto */}
            <div className="mt-4 text-white px-4">
              <h3 className="text-2xl font-bold mb-2">{selectedVideo.title}</h3>
              <p className="text-white/70">{selectedVideo.description}</p>
            </div>
          </div>
        </div>
      )}
    </PageLayout>
  );
};
