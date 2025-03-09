export interface Anime {
  id: number;
  title: string;
  imageUrl: string;
  mood: string[];
  genre: string[];
  description: string;
  rating: number;
  releaseYear: number;
  director: string;
  studio: string;
}

export interface User {
  name: string;
  avatar: string;
  favoriteAnime: number[];
  watchHistory: WatchHistoryItem[];
  email: string;
  joinDate: string;
}

export interface WatchHistoryItem {
  animeId: number;
  timestamp: string;
  completed: boolean;
  rating?: number;
}