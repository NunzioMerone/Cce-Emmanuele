import { Playlist, MediaItem } from "../types/media";

const API_KEY = "AIzaSyCk_9mvP7gi9HTJevgxOQpSPnooW-hiAU0";
const CHANNEL_USERNAME = "@chiesacristianaevangelicae2674";

interface YouTubeSearchResult {
  items: Array<{
    snippet: {
      channelId: string;
    };
  }>;
}

interface YouTubePlaylistsResult {
  items: Array<{
    id: string;
    snippet: {
      title: string;
      description: string;
    };
  }>;
}

interface YouTubePlaylistItemsResult {
  items: Array<{
    snippet: {
      resourceId: {
        videoId: string;
      };
      title: string;
      description: string;
      publishedAt: string;
      thumbnails: {
        maxres?: { url: string };
        high: { url: string };
        medium: { url: string };
      };
    };
  }>;
  nextPageToken?: string;
}

const extractBibleReference = (
  title: string
): { cleanTitle: string; reference: string } => {
  const patterns = [
    /\b(\d?\s?[A-Za-z]+\s+\d+:\d+(?:-\d+)?(?:,\s*\d+:\d+)?)\b/g,
    /\b([A-Za-z]+\.?\s*\d+:\d+(?:-\d+)?)\b/g,
  ];

  let reference = "";
  let cleanTitle = title;

  for (const pattern of patterns) {
    const matches = title.match(pattern);
    if (matches && matches.length > 0) {
      reference = matches.join(", ");
      cleanTitle = title.replace(pattern, "").trim();
      cleanTitle = cleanTitle
        .replace(/\s+/g, " ")
        .replace(/^[-–—]\s*/, "")
        .trim();
      break;
    }
  }

  return { cleanTitle: cleanTitle || title, reference };
};

export const youtubeService = {
  async getChannelIdFromUsername(): Promise<string | null> {
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
          CHANNEL_USERNAME
        )}&type=channel&key=${API_KEY}`
      );

      if (!response.ok) {
        console.error("Failed to fetch channel ID:", response.statusText);
        return null;
      }

      const data: YouTubeSearchResult = await response.json();

      if (data.items && data.items.length > 0) {
        return data.items[0].snippet.channelId;
      }

      return null;
    } catch (error) {
      console.error("Error fetching channel ID:", error);
      return null;
    }
  },

  async getChannelPlaylists(): Promise<Playlist[]> {
    try {
      console.log("🔄 Inizio sincronizzazione playlist...");

      const channelId = await this.getChannelIdFromUsername();

      if (!channelId) {
        console.error("❌ Impossibile trovare l'ID del canale");
        alert("Errore: impossibile trovare il canale YouTube");
        return [];
      }

      console.log("✅ Canale trovato:", channelId);

      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/playlists?part=snippet,contentDetails&channelId=${channelId}&maxResults=50&key=${API_KEY}`
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("❌ Errore API:", errorData);
        alert(
          `Errore API: ${errorData.error?.message || "Errore sconosciuto"}`
        );
        return [];
      }

      const data: YouTubePlaylistsResult = await response.json();
      console.log(`📋 Trovate ${data.items?.length || 0} playlist`);

      const playlists: Playlist[] = [];

      for (const item of data.items || []) {
        console.log(`📹 Caricamento video per playlist: ${item.snippet.title}`);
        const videos = await this.getPlaylistVideos(item.id);

        playlists.push({
          id: item.id,
          title: item.snippet.title,
          description: item.snippet.description || "",
          youtubePlaylistUrl: `https://www.youtube.com/playlist?list=${item.id}`,
          videos,
        });
      }

      console.log(
        `✅ Sincronizzazione completata: ${
          playlists.length
        } playlist, ${playlists.reduce(
          (acc, p) => acc + p.videos.length,
          0
        )} video totali`
      );

      return playlists;
    } catch (error) {
      console.error("❌ Errore durante la sincronizzazione:", error);
      alert(
        "Errore durante la sincronizzazione. Controlla la console per i dettagli."
      );
      return [];
    }
  },

  async getPlaylistVideos(playlistId: string): Promise<MediaItem[]> {
    try {
      let allVideos: MediaItem[] = [];
      let nextPageToken: string | undefined;

      do {
        const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&maxResults=50${
          nextPageToken ? `&pageToken=${nextPageToken}` : ""
        }&key=${API_KEY}`;

        const response = await fetch(url);

        if (!response.ok) {
          console.error("Failed to fetch videos for playlist:", playlistId);
          break;
        }

        const data: YouTubePlaylistItemsResult = await response.json();

        for (const item of data.items || []) {
          const videoId = item.snippet.resourceId.videoId;
          const { cleanTitle, reference } = extractBibleReference(
            item.snippet.title
          );

          allVideos.push({
            id: videoId,
            title: cleanTitle,
            description: reference || item.snippet.description,
            youtubeUrl: `https://www.youtube.com/watch?v=${videoId}`,
            thumbnail:
              item.snippet.thumbnails.maxres?.url ||
              item.snippet.thumbnails.high?.url ||
              item.snippet.thumbnails.medium?.url ||
              `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
            publishedAt: item.snippet.publishedAt.split("T")[0],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          });
        }

        nextPageToken = data.nextPageToken;
      } while (nextPageToken);

      console.log(`  ✅ ${allVideos.length} video caricati`);
      return allVideos;
    } catch (error) {
      console.error("Error fetching videos:", error);
      return [];
    }
  },

  async syncPlaylists(): Promise<Playlist[]> {
    try {
      let playlists = await this.getChannelPlaylists();

      if (playlists.length > 0) {
        // Ordina le playlist
        playlists = playlists.sort((a, b) => {
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

        // Salva nel localStorage
        localStorage.setItem("playlists", JSON.stringify(playlists));

        // Verifica che sia stato salvato
        const saved = localStorage.getItem("playlists");
        console.log("💾 Salvato nel localStorage:", saved ? "SI" : "NO");

        if (saved) {
          const parsed = JSON.parse(saved);
          console.log("✅ Playlist salvate:", parsed.length);
        }

        alert(
          `✅ Sincronizzazione completata!\n\n${
            playlists.length
          } playlist caricate\n${playlists.reduce(
            (acc, p) => acc + p.videos.length,
            0
          )} video totali\n\nRicarica la pagina per vedere i cambiamenti.`
        );
      } else {
        alert("❌ Nessuna playlist trovata");
      }

      return playlists;
    } catch (error) {
      console.error("Error syncing playlists:", error);
      alert("❌ Errore durante la sincronizzazione");
      return [];
    }
  },
};
