import React, { useState, useEffect } from "react";
import { PageLayout } from "../components/layout/PageLayout";
import { Modal } from "../components/common/Modal";
import { Button } from "../components/common/Button";
import { MediaItem, extractYouTubeId, Playlist } from "../types/media";
import { storage } from "../utils/storageUtils";
import { playlistsMock } from "../utils/playlistsMock";

export const MediaPage: React.FC = () => {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [filteredPlaylists, setFilteredPlaylists] = useState<Playlist[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<MediaItem | null>(null);
  const [activePlaylist, setActivePlaylist] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    loadPlaylists();
  }, []);

  useEffect(() => {
    // Filtra le playlist in base alla ricerca
    if (searchQuery.trim()) {
      const filtered = playlists.filter(
        (p) =>
          p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredPlaylists(filtered);
    } else {
      setFilteredPlaylists(playlists);
    }
  }, [searchQuery, playlists]);

  const loadPlaylists = () => {
    // Prova a caricare dal localStorage
    let stored = storage.getPlaylists();

    console.log(
      "📥 Caricamento playlist dal localStorage:",
      stored ? stored.length : "NESSUNA"
    );

    let loadedPlaylists = stored || playlistsMock;

    // Ordina le playlist
    loadedPlaylists = loadedPlaylists.sort((a, b) => {
      if (
        a.title.toLowerCase().includes("messaggi domenicali") ||
        a.title.toLowerCase().includes("messaggio domenicale")
      ) {
        return -1;
      }
      if (
        b.title.toLowerCase().includes("messaggi domenicali") ||
        b.title.toLowerCase().includes("messaggio domenicale")
      ) {
        return 1;
      }
      return a.title.localeCompare(b.title);
    });

    setPlaylists(loadedPlaylists);
    setFilteredPlaylists(loadedPlaylists);

    if (loadedPlaylists.length > 0) {
      setActivePlaylist(loadedPlaylists[0].id);
    }
  };

  const activePlaylistData = filteredPlaylists.find(
    (p) => p.id === activePlaylist
  );

  return (
    <PageLayout>
      {/* Hero Section con effetto parallax */}
      <div className="relative pt-24 pb-32 bg-gradient-to-br from-blue-600 via-blue-500 to-purple-600 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl animate-float"></div>
          <div
            className="absolute bottom-20 right-10 w-96 h-96 bg-white rounded-full blur-3xl animate-float"
            style={{ animationDelay: "2s" }}
          ></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white rounded-full blur-3xl animate-pulse"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-white mb-6 animate-fade-in">
            Media & Predicazioni
          </h1>
          <p
            className="text-xl text-white/90 max-w-3xl mx-auto animate-fade-in"
            style={{ animationDelay: "0.2s", animationFillMode: "both" }}
          >
            Scopri le nostre predicazioni, studi biblici e contenuti video per
            crescere nella fede
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10">
        {/* Search Bar Only */}
        <div className="flex justify-center mb-8 animate-slide-up">
          {/* Search Bar */}
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              placeholder="Cerca playlist..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 pl-12 bg-white rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all shadow-lg"
            />
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Playlist Counter */}
        {searchQuery && (
          <div className="mb-6 text-center">
            <p className="text-gray-600">
              {filteredPlaylists.length === 0
                ? "Nessuna playlist trovata"
                : `${filteredPlaylists.length} playlist ${
                    filteredPlaylists.length === 1 ? "trovata" : "trovate"
                  }`}
            </p>
          </div>
        )}

        {/* Playlist Tabs - Scrollable */}
        <div className="bg-white rounded-2xl shadow-2xl p-2 mb-12 animate-slide-up overflow-hidden">
          <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-hide">
            {filteredPlaylists.map((playlist) => (
              <button
                key={playlist.id}
                onClick={() => setActivePlaylist(playlist.id)}
                className={`flex-shrink-0 px-6 py-4 rounded-xl font-semibold transition-all duration-300 whitespace-nowrap ${
                  activePlaylist === playlist.id
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105"
                    : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <span>{playlist.title}</span>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      activePlaylist === playlist.id
                        ? "bg-white/20"
                        : "bg-gray-200"
                    }`}
                  >
                    {playlist.videos.length}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Active Playlist Content */}
        {activePlaylistData && (
          <div className="animate-fade-in">
            {/* Playlist Header */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 mb-8 border-2 border-blue-200 shadow-lg animate-slide-up">
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
                      d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
                    {activePlaylistData.title}
                  </h2>
                  <p className="text-base text-gray-600 mb-4">
                    {activePlaylistData.description}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center">
                      <svg
                        className="w-5 h-5 mr-1"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      </svg>
                      {activePlaylistData.videos.length} video
                    </span>
                  </div>
                </div>
                <Button
                  onClick={() =>
                    window.open(activePlaylistData.youtubePlaylistUrl, "_blank")
                  }
                  variant="primary"
                  size="md"
                  className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 shadow-lg"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z" />
                    <path
                      fill="#fff"
                      d="M9.545 15.568V8.432L15.818 12l-6.273 3.568z"
                    />
                  </svg>
                  Vedi su YouTube
                </Button>
              </div>
            </div>

            {/* Videos Grid - Premium Design */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-20">
              {activePlaylistData.videos.map((video, index) => (
                <div
                  key={video.id}
                  onClick={() => setSelectedVideo(video)}
                  className="group cursor-pointer animate-slide-up"
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animationFillMode: "both",
                  }}
                >
                  {/* Video Card */}
                  <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100">
                    {/* Thumbnail with overlay */}
                    <div className="relative aspect-video bg-gray-900 overflow-hidden">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />

                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-60 group-hover:opacity-80 transition-all duration-500"></div>

                      {/* Play button */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center shadow-2xl transform transition-all duration-500 group-hover:scale-110 group-hover:bg-red-700">
                          <svg
                            className="w-8 h-8 text-white ml-1"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>

                      {/* Duration badge */}
                      <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-lg flex items-center font-medium">
                        <svg
                          className="w-3 h-3 mr-1"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
                        </svg>
                        Video
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 text-lg group-hover:text-blue-600 transition-colors duration-300">
                        {video.title}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                        {video.description}
                      </p>

                      {/* Meta info */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <span className="text-xs text-gray-500 flex items-center">
                          <svg
                            className="w-4 h-4 mr-1"
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
                          {new Date(video.publishedAt).toLocaleDateString(
                            "it-IT",
                            {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            }
                          )}
                        </span>
                        <div className="flex items-center text-red-600 font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <span>Guarda ora</span>
                          <svg
                            className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform"
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
                      </div>
                    </div>

                    {/* Decorative gradient border on hover */}
                    <div className="absolute inset-0 border-2 border-transparent group-hover:border-gradient-to-br from-blue-500 to-purple-500 rounded-2xl pointer-events-none transition-all duration-500"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
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
              )}?autoplay=1`}
              title={selectedVideo.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded-lg"
            />
          </div>
        )}
      </Modal>
    </PageLayout>
  );
};
