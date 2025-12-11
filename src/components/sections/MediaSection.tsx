import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MediaItem } from "../../types/media";
import { storage } from "../../utils/storageUtils";
import { playlistsMock } from "../../utils/playlistsMock";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";

export const MediaSection: React.FC = () => {
  const [videos, setVideos] = useState<MediaItem[]>([]);
  const navigate = useNavigate();
  const section = useScrollAnimation();

  useEffect(() => {
    const playlists = storage.getPlaylists() || playlistsMock;

    if (playlists.length > 0 && playlists[0].videos.length > 0) {
      setVideos(playlists[0].videos.slice(0, 3));
    }
  }, []);

  return (
    <section ref={section.ref} className="py-20 bg-white">
      <div
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-1000 ${
          section.isVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
      >
        <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">
          Ultime Predicazioni
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {videos.map((video) => (
            <div
              key={video.id}
              className="group cursor-pointer"
              onClick={() => navigate(`/media?video=${video.id}`)}
            >
              <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden mb-4">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                  <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center transform transition-transform group-hover:scale-110">
                    <svg
                      className="w-7 h-7 text-white ml-1"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>
              <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                {video.title}
              </h3>
              <p className="text-sm text-gray-600 line-clamp-2">
                {video.description}
              </p>
            </div>
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
      </div>
    </section>
  );
};
