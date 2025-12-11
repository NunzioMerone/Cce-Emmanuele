export interface MediaItem {
  id: string;
  title: string;
  description: string;
  youtubeUrl: string;
  thumbnail: string;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface MediaFormData {
  title: string;
  description: string;
  youtubeUrl: string;
  thumbnail: string;
}

export const extractYouTubeId = (url: string): string => {
  // Supporta vari formati di URL YouTube
  const patterns = [
    /youtube\.com\/watch\?v=([^&]+)/,
    /youtube\.com\/embed\/([^?]+)/,
    /youtu\.be\/([^?]+)/,
    /youtube\.com\/v\/([^?]+)/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }

  return "";
};

export interface Playlist {
  id: string;
  title: string;
  description: string;
  youtubePlaylistUrl: string;
  videos: MediaItem[];
}
