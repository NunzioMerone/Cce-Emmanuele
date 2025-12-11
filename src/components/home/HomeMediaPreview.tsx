import React, { useState, useEffect } from "react";
import { MediaItem } from "../../types/media";
import { storage } from "../../utils/storageUtils";
import { playlistsMock } from "../../utils/playlistsMock";

interface HomeMediaPreviewProps {
  onVideoClick?: (video: MediaItem) => void;
}

export const HomeMediaPreview: React.FC<HomeMediaPreviewProps> = ({
  onVideoClick,
}) => {
  const [videos, setVideos] = useState<MediaItem[]>([]);

  useEffect(() => {
    const stored = storage.getPlaylists();
    const playlists = stored || playlistsMock;

    // Raccoglie TUTTI i video da TUTTE le playlist
    const allVideos: MediaItem[] = [];
    playlists.forEach((playlist) => {
      allVideos.push(...playlist.videos);
    });

    // Ordina per data di pubblicazione (più recenti prima)
    const sortedVideos = allVideos.sort((a, b) => {
      return (
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      );
    });

    // Prendi i 3 più recenti
    const latestThree = sortedVideos.slice(0, 3);

    console.log(
      "📹 Video più recenti:",
      latestThree.map((v) => ({ title: v.title, date: v.publishedAt }))
    );

    setVideos(latestThree);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {videos.map((video, index) => (
        <div
          key={video.id}
          onClick={() => onVideoClick?.(video)}
          className="group cursor-pointer animate-fade-in"
          style={{
            animationDelay: `${index * 100}ms`,
            animationFillMode: "both",
          }}
        >
          <div className="relative bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300">
            <div className="relative aspect-video bg-gray-900">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent group-hover:from-black/70 transition-all"></div>

              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center shadow-2xl transform transition-all duration-300 group-hover:scale-110">
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

            <div className="p-4">
              <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                {video.title}
              </h3>
              <p className="text-xs text-gray-500">
                {new Date(video.publishedAt).toLocaleDateString("it-IT")}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
