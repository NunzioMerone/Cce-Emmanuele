import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SectionTitle } from "../common/SectionTitle";
import { Card } from "../common/Card";
import { Modal } from "../common/Modal";
import { MediaItem, extractYouTubeId, Playlist } from "../../types/media";
import { mediaMock } from "../../utils/mediaMock";
import { storage } from "../../utils/storageUtils";
import { playlistsMock } from "../../utils/playlistsMock";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";

export const MediaSection: React.FC = () => {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<MediaItem | null>(null);
  const navigate = useNavigate();
  const section = useScrollAnimation();

  useEffect(() => {
    const stored = storage.getMedia();
    setMedia(stored || mediaMock);
  }, []);

  useEffect(() => {
    const playlists = storage.getPlaylists() || playlistsMock;

    // Prendi i primi 3 video dalla prima playlist
    if (playlists.length > 0 && playlists[0].videos.length > 0) {
      setMedia(playlists[0].videos.slice(0, 3));
    }
  }, []);

  return (
    <section id="media" className="py-24 bg-white">
      <div
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-1000 ${
          section.isVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
      >
        <SectionTitle
          title="Media"
          subtitle="Guarda le nostre predicazioni e testimonianze"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {media.map((item) => (
            <Card
              key={item.id}
              hover
              onClick={() => setSelectedVideo(item)}
              className="cursor-pointer"
            >
              <div className="relative">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                    <svg
                      className="w-8 h-8 text-primary-600 ml-1"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {item.description}
                </p>
                <p className="text-xs text-gray-400 mt-2">
                  {new Date(item.publishedAt).toLocaleDateString("it-IT")}
                </p>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={() => navigate("/media")}
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            Vedi tutte le predicazioni
            <svg
              className="w-5 h-5 ml-2"
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
          </button>
        </div>

        {/* Video Modal */}
        <Modal
          isOpen={!!selectedVideo}
          onClose={() => setSelectedVideo(null)}
          title={selectedVideo?.title}
          size="xl"
        >
          {selectedVideo && (
            <div className="aspect-video">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${extractYouTubeId(
                  selectedVideo.youtubeUrl
                )}`}
                title={selectedVideo.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-lg"
              />
            </div>
          )}
        </Modal>
      </div>
    </section>
  );
};
