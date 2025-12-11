// NOTA: Per usare questo servizio ti serve una API Key di YouTube
// Ottienila qui: https://console.cloud.google.com/apis/credentials

const YOUTUBE_API_KEY = "TUA_API_KEY_QUI"; // Sostituisci con la tua chiave
const YOUTUBE_API_URL = "https://www.googleapis.com/youtube/v3";

export interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  publishedAt: string;
}

export const youtubeService = {
  // Ottiene i video da una playlist
  async getPlaylistVideos(
    playlistId: string,
    maxResults: number = 4
  ): Promise<YouTubeVideo[]> {
    try {
      const response = await fetch(
        `${YOUTUBE_API_URL}/playlistItems?part=snippet&playlistId=${playlistId}&maxResults=${maxResults}&key=${YOUTUBE_API_KEY}`
      );

      const data = await response.json();

      if (!data.items) return [];

      return data.items.map((item: any) => ({
        id: item.snippet.resourceId.videoId,
        title: item.snippet.title,
        description: item.snippet.description,
        thumbnailUrl:
          item.snippet.thumbnails.maxres?.url ||
          item.snippet.thumbnails.high.url,
        publishedAt: item.snippet.publishedAt,
      }));
    } catch (error) {
      console.error("Errore nel caricamento video:", error);
      return [];
    }
  },

  // Ottiene info di un singolo video
  async getVideoDetails(videoId: string): Promise<YouTubeVideo | null> {
    try {
      const response = await fetch(
        `${YOUTUBE_API_URL}/videos?part=snippet&id=${videoId}&key=${YOUTUBE_API_KEY}`
      );

      const data = await response.json();

      if (!data.items || data.items.length === 0) return null;

      const item = data.items[0];
      return {
        id: item.id,
        title: item.snippet.title,
        description: item.snippet.description,
        thumbnailUrl:
          item.snippet.thumbnails.maxres?.url ||
          item.snippet.thumbnails.high.url,
        publishedAt: item.snippet.publishedAt,
      };
    } catch (error) {
      console.error("Errore nel caricamento video:", error);
      return null;
    }
  },
};
