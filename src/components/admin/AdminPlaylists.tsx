import React, { useState, useEffect } from "react";
import { Card } from "../common/Card";
import { Button } from "../common/Button";
import { Modal } from "../common/Modal";
import { Input } from "../common/Input";
import { TextArea } from "../common/TextArea";
import { Playlist, MediaItem } from "../../types/media";
import { storage } from "../../utils/storageUtils";
import { playlistsMock } from "../../utils/playlistsMock";
import { youtubeService } from "../../services/youtubeApi";

export const AdminPlaylists: React.FC = () => {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [editingPlaylist, setEditingPlaylist] = useState<Playlist | null>(null);
  const [editingVideo, setEditingVideo] = useState<{
    playlistId: string;
    video: MediaItem;
  } | null>(null);
  const [selectedPlaylistId, setSelectedPlaylistId] = useState<string | null>(
    null
  );
  const [isSyncing, setIsSyncing] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    youtubePlaylistUrl: "",
  });

  const [videoFormData, setVideoFormData] = useState({
    title: "",
    description: "",
    youtubeUrl: "",
    publishedAt: "",
  });

  useEffect(() => {
    loadPlaylists();
  }, []);

  const loadPlaylists = () => {
    const stored = storage.getPlaylists();
    setPlaylists(stored || playlistsMock);
  };

  const savePlaylists = (updatedPlaylists: Playlist[]) => {
    storage.setPlaylists(updatedPlaylists);
    setPlaylists(updatedPlaylists);
    loadPlaylists();
  };

  const handleSyncFromYouTube = async () => {
    if (
      !confirm(
        "Vuoi sincronizzare tutte le playlist da YouTube?\n\nQuesto sostituirà i dati esistenti con quelli dal canale YouTube."
      )
    ) {
      return;
    }

    setIsSyncing(true);

    try {
      const synced = await youtubeService.syncPlaylists();

      if (synced.length > 0) {
        // Salva esplicitamente nel localStorage
        storage.setPlaylists(synced);

        // Ricarica immediatamente le playlist
        setPlaylists(synced);

        // Force reload dalla funzione loadPlaylists
        loadPlaylists();

        console.log("✅ Playlist aggiornate:", synced.length);
      }
    } catch (error) {
      console.error("Errore sincronizzazione:", error);
      alert("❌ Errore durante la sincronizzazione");
    } finally {
      setIsSyncing(false);
    }
  };

  const handleAddPlaylist = () => {
    setEditingPlaylist(null);
    setFormData({
      title: "",
      description: "",
      youtubePlaylistUrl: "",
    });
    setIsModalOpen(true);
  };

  const handleEditPlaylist = (playlist: Playlist) => {
    setEditingPlaylist(playlist);
    setFormData({
      title: playlist.title,
      description: playlist.description,
      youtubePlaylistUrl: playlist.youtubePlaylistUrl,
    });
    setIsModalOpen(true);
  };

  const handleDeletePlaylist = (id: string) => {
    if (confirm("Sei sicuro di voler eliminare questa playlist?")) {
      const updated = playlists.filter((p) => p.id !== id);
      savePlaylists(updated);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingPlaylist) {
      const updated = playlists.map((p) =>
        p.id === editingPlaylist.id
          ? { ...p, ...formData, updatedAt: new Date().toISOString() }
          : p
      );
      savePlaylists(updated);
    } else {
      const newPlaylist: Playlist = {
        id: Date.now().toString(),
        ...formData,
        videos: [],
      };
      savePlaylists([...playlists, newPlaylist]);
    }

    setIsModalOpen(false);
  };

  const handleAddVideo = (playlistId: string) => {
    setSelectedPlaylistId(playlistId);
    setEditingVideo(null);
    setVideoFormData({
      title: "",
      description: "",
      youtubeUrl: "",
      publishedAt: new Date().toISOString().split("T")[0],
    });
    setIsVideoModalOpen(true);
  };

  const handleEditVideo = (playlistId: string, video: MediaItem) => {
    setEditingVideo({ playlistId, video });
    setSelectedPlaylistId(playlistId);
    setVideoFormData({
      title: video.title,
      description: video.description,
      youtubeUrl: video.youtubeUrl,
      publishedAt: video.publishedAt,
    });
    setIsVideoModalOpen(true);
  };

  const handleDeleteVideo = (playlistId: string, videoId: string) => {
    if (confirm("Sei sicuro di voler eliminare questo video?")) {
      const updated = playlists.map((p) => {
        if (p.id === playlistId) {
          return {
            ...p,
            videos: p.videos.filter((v) => v.id !== videoId),
          };
        }
        return p;
      });
      savePlaylists(updated);
    }
  };

  const handleSubmitVideo = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedPlaylistId) return;

    const videoId =
      videoFormData.youtubeUrl.match(/watch\?v=([^&]+)/)?.[1] || "";

    if (editingVideo) {
      const updated = playlists.map((p) => {
        if (p.id === selectedPlaylistId) {
          return {
            ...p,
            videos: p.videos.map((v) =>
              v.id === editingVideo.video.id
                ? {
                    ...v,
                    title: videoFormData.title,
                    description: videoFormData.description,
                    youtubeUrl: videoFormData.youtubeUrl,
                    thumbnail: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
                    publishedAt: videoFormData.publishedAt,
                    updatedAt: new Date().toISOString(),
                  }
                : v
            ),
          };
        }
        return p;
      });
      savePlaylists(updated);
      setEditingVideo(null);
    } else {
      const newVideo: MediaItem = {
        id: Date.now().toString(),
        title: videoFormData.title,
        description: videoFormData.description,
        youtubeUrl: videoFormData.youtubeUrl,
        thumbnail: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
        publishedAt: videoFormData.publishedAt,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const updated = playlists.map((p) => {
        if (p.id === selectedPlaylistId) {
          return { ...p, videos: [...p.videos, newVideo] };
        }
        return p;
      });

      savePlaylists(updated);
    }

    setIsVideoModalOpen(false);
    setVideoFormData({
      title: "",
      description: "",
      youtubeUrl: "",
      publishedAt: "",
    });
  };

  const handleMoveVideo = (
    videoId: string,
    fromPlaylistId: string,
    toPlaylistId: string
  ) => {
    const fromPlaylist = playlists.find((p) => p.id === fromPlaylistId);
    const video = fromPlaylist?.videos.find((v) => v.id === videoId);

    if (!video) return;

    const updated = playlists.map((p) => {
      if (p.id === fromPlaylistId) {
        return { ...p, videos: p.videos.filter((v) => v.id !== videoId) };
      }
      if (p.id === toPlaylistId) {
        return { ...p, videos: [...p.videos, video] };
      }
      return p;
    });

    savePlaylists(updated);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-gray-900">Gestione Playlist</h2>
        <div className="flex gap-3">
          <Button
            onClick={handleSyncFromYouTube}
            variant="outline"
            className="border-red-300 text-red-600 hover:bg-red-50"
            disabled={isSyncing}
          >
            {isSyncing ? (
              <>
                <svg
                  className="animate-spin w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                Sincronizzazione...
              </>
            ) : (
              <>
                <svg
                  className="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z" />
                </svg>
                Sincronizza da YouTube
              </>
            )}
          </Button>
          <Button
            onClick={handleAddPlaylist}
            variant="primary"
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg"
          >
            + Aggiungi Playlist
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        {playlists.map((playlist) => (
          <Card
            key={playlist.id}
            className="overflow-hidden border-2 border-gray-100 hover:border-blue-200 transition-all duration-300"
          >
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 border-b">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {playlist.title}
                  </h3>
                  <p className="text-gray-600 mb-2">{playlist.description}</p>
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      </svg>
                      {playlist.videos.length} video
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-2 ml-4">
                  <button
                    onClick={() => handleEditPlaylist(playlist)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Modifica playlist"
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
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleDeletePlaylist(playlist.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Elimina playlist"
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
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Videos in Playlist */}
            <div className="p-6 bg-white">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-bold text-gray-900 text-lg">
                  Video nella Playlist
                </h4>
                <Button
                  onClick={() => handleAddVideo(playlist.id)}
                  variant="outline"
                  size="sm"
                  className="border-blue-300 text-blue-600 hover:bg-blue-50"
                >
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
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  Aggiungi Video
                </Button>
              </div>

              {playlist.videos.length === 0 ? (
                <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
                  <svg
                    className="w-12 h-12 mx-auto text-gray-400 mb-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                  <p className="text-gray-500 font-medium">
                    Nessun video in questa playlist
                  </p>
                  <p className="text-gray-400 text-sm mt-1">
                    Clicca "Aggiungi Video" per iniziare
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {playlist.videos.map((video) => (
                    <div
                      key={video.id}
                      className="group bg-gray-50 hover:bg-blue-50 p-4 rounded-xl transition-all duration-200 border border-gray-200 hover:border-blue-300"
                    >
                      <div className="flex items-center gap-4">
                        {/* Thumbnail */}
                        <div className="relative flex-shrink-0">
                          <img
                            src={video.thumbnail}
                            alt={video.title}
                            className="w-32 h-20 object-cover rounded-lg shadow-sm"
                          />
                          <div className="absolute inset-0 bg-black/40 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <svg
                              className="w-8 h-8 text-white"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </div>
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex-1">
                              <p className="font-semibold text-gray-900 mb-1 line-clamp-1">
                                {video.title}
                              </p>
                              <p className="text-sm text-gray-600 line-clamp-1 mb-2">
                                {video.description}
                              </p>
                              <div className="flex items-center gap-3 text-xs text-gray-500">
                                <span className="flex items-center">
                                  <svg
                                    className="w-3 h-3 mr-1"
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
                                  {new Date(
                                    video.publishedAt
                                  ).toLocaleDateString("it-IT")}
                                </span>
                              </div>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() =>
                                  handleEditVideo(playlist.id, video)
                                }
                                className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                                title="Modifica video"
                              >
                                <svg
                                  className="w-4 h-4"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                  />
                                </svg>
                              </button>

                              {/* Move to playlist dropdown */}
                              {playlists.length > 1 && (
                                <div className="relative">
                                  <select
                                    onChange={(e) => {
                                      if (e.target.value) {
                                        handleMoveVideo(
                                          video.id,
                                          playlist.id,
                                          e.target.value
                                        );
                                        e.target.value = "";
                                      }
                                    }}
                                    className="appearance-none pl-2 pr-8 py-2 text-xs border border-gray-300 rounded-lg hover:border-blue-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors cursor-pointer"
                                    defaultValue=""
                                  >
                                    <option value="" disabled>
                                      Sposta in...
                                    </option>
                                    {playlists
                                      .filter((p) => p.id !== playlist.id)
                                      .map((p) => (
                                        <option key={p.id} value={p.id}>
                                          {p.title}
                                        </option>
                                      ))}
                                  </select>
                                  <svg
                                    className="w-4 h-4 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M8 7h12M8 12h12m-7 5h7"
                                    />
                                  </svg>
                                </div>
                              )}

                              <button
                                onClick={() =>
                                  handleDeleteVideo(playlist.id, video.id)
                                }
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                title="Elimina video"
                              >
                                <svg
                                  className="w-4 h-4"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                  />
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* Modal for Playlist */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingPlaylist ? "Modifica Playlist" : "Nuova Playlist"}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Titolo"
            value={formData.title}
            onChange={(value) => setFormData({ ...formData, title: value })}
            required
          />
          <TextArea
            label="Descrizione"
            value={formData.description}
            onChange={(value) =>
              setFormData({ ...formData, description: value })
            }
            required
            rows={3}
          />
          <Input
            label="URL Playlist YouTube"
            value={formData.youtubePlaylistUrl}
            onChange={(value) =>
              setFormData({ ...formData, youtubePlaylistUrl: value })
            }
            placeholder="https://www.youtube.com/playlist?list=..."
            required
          />
          <div className="flex space-x-3 pt-4">
            <Button
              type="submit"
              variant="primary"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
            >
              {editingPlaylist ? "Aggiorna" : "Crea"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsModalOpen(false)}
              className="flex-1"
            >
              Annulla
            </Button>
          </div>
        </form>
      </Modal>

      {/* Modal for Video */}
      <Modal
        isOpen={isVideoModalOpen}
        onClose={() => {
          setIsVideoModalOpen(false);
          setEditingVideo(null);
        }}
        title={editingVideo ? "Modifica Video" : "Aggiungi Video"}
      >
        <form onSubmit={handleSubmitVideo} className="space-y-4">
          <Input
            label="Titolo"
            value={videoFormData.title}
            onChange={(value) =>
              setVideoFormData({ ...videoFormData, title: value })
            }
            required
          />
          <TextArea
            label="Descrizione"
            value={videoFormData.description}
            onChange={(value) =>
              setVideoFormData({ ...videoFormData, description: value })
            }
            required
            rows={3}
          />
          <Input
            label="URL Video YouTube"
            value={videoFormData.youtubeUrl}
            onChange={(value) =>
              setVideoFormData({ ...videoFormData, youtubeUrl: value })
            }
            placeholder="https://www.youtube.com/watch?v=..."
            required
          />
          <Input
            label="Data Pubblicazione"
            type="date"
            value={videoFormData.publishedAt}
            onChange={(value) =>
              setVideoFormData({ ...videoFormData, publishedAt: value })
            }
            required
          />
          <div className="flex space-x-3 pt-4">
            <Button
              type="submit"
              variant="primary"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
            >
              {editingVideo ? "Aggiorna" : "Aggiungi"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setIsVideoModalOpen(false);
                setEditingVideo(null);
              }}
              className="flex-1"
            >
              Annulla
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
