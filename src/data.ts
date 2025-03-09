import { Anime, User } from './types';

export const animeData: Anime[] = [
  {
    id: 1,
    title: "My Neighbor Totoro",
    imageUrl: "https://images.unsplash.com/photo-1612487528505-d2338264c821?auto=format&fit=crop&q=80&w=400",
    mood: ["Happy", "Peaceful", "Heartwarming"],
    genre: ["Fantasy", "Family"],
    description: "A heartwarming tale of two sisters who move to the countryside and discover magical creatures.",
    rating: 4.8,
    releaseYear: 1988,
    director: "Hayao Miyazaki",
    studio: "Studio Ghibli"
  },
  {
    id: 2,
    title: "Attack on Titan",
    imageUrl: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&q=80&w=400",
    mood: ["Intense", "Dark", "Thrilling"],
    genre: ["Action", "Drama"],
    description: "Humanity fights for survival against giant humanoid creatures in a post-apocalyptic world.",
    rating: 4.9,
    releaseYear: 2013,
    director: "Tetsurō Araki",
    studio: "Wit Studio"
  },
  {
    id: 3,
    title: "Your Name",
    imageUrl: "https://images.unsplash.com/photo-1579547621113-e4bb2a19bdd6?auto=format&fit=crop&q=80&w=400",
    mood: ["Romantic", "Nostalgic", "Emotional"],
    genre: ["Romance", "Fantasy"],
    description: "Two teenagers mysteriously swap bodies and must find each other across time and space.",
    rating: 4.7,
    releaseYear: 2016,
    director: "Makoto Shinkai",
    studio: "CoMix Wave Films"
  },
  {
    id: 4,
    title: "Demon Slayer",
    imageUrl: "https://images.unsplash.com/photo-1618336753974-aae8e04506aa?auto=format&fit=crop&q=80&w=400",
    mood: ["Intense", "Emotional", "Thrilling"],
    genre: ["Action", "Supernatural"],
    description: "A young boy becomes a demon slayer after his family is slaughtered and his sister turned into a demon.",
    rating: 4.9,
    releaseYear: 2019,
    director: "Haruo Sotozaki",
    studio: "ufotable"
  },
  {
    id: 5,
    title: "Spirited Away",
    imageUrl: "https://images.unsplash.com/photo-1563302111-eab4b145e6c9?auto=format&fit=crop&q=80&w=400",
    mood: ["Magical", "Mysterious", "Heartwarming"],
    genre: ["Fantasy", "Adventure"],
    description: "A young girl enters a mysterious world of spirits and must work to save her parents who have been transformed into pigs.",
    rating: 4.9,
    releaseYear: 2001,
    director: "Hayao Miyazaki",
    studio: "Studio Ghibli"
  },
  {
    id: 6,
    title: "One Punch Man",
    imageUrl: "https://images.unsplash.com/photo-1614583225154-5fcdda07019e?auto=format&fit=crop&q=80&w=400",
    mood: ["Funny", "Action-packed", "Exciting"],
    genre: ["Action", "Comedy"],
    description: "A superhero who can defeat any opponent with a single punch searches for a worthy challenge.",
    rating: 4.8,
    releaseYear: 2015,
    director: "Shingo Natsume",
    studio: "Madhouse"
  },
  {
    id: 7,
    title: "A Silent Voice",
    imageUrl: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?auto=format&fit=crop&q=80&w=400",
    mood: ["Emotional", "Heartwarming", "Dramatic"],
    genre: ["Drama", "Romance"],
    description: "A former bully tries to make amends with a deaf girl he tormented in elementary school.",
    rating: 4.7,
    releaseYear: 2016,
    director: "Naoko Yamada",
    studio: "Kyoto Animation"
  }
];

export const moods = [
  "Happy", "Peaceful", "Heartwarming", "Intense", "Dark", "Thrilling",
  "Romantic", "Nostalgic", "Emotional", "Magical", "Mysterious", "Funny",
  "Action-packed", "Exciting", "Dramatic"
];

export const genres = [
  "Action", "Adventure", "Comedy", "Drama", "Fantasy", "Romance",
  "Sci-Fi", "Slice of Life", "Supernatural", "Family"
];

export const currentUser: User = {
  name: "Anime Fan",
  email: "animefan@example.com",
  avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&q=80&w=100",
  favoriteAnime: [1, 3, 5],
  joinDate: "2024-01-15",
  watchHistory: [
    { animeId: 1, timestamp: "2024-03-10T15:30:00Z", completed: true, rating: 5 },
    { animeId: 3, timestamp: "2024-03-08T20:15:00Z", completed: true, rating: 4 },
    { animeId: 5, timestamp: "2024-03-05T18:45:00Z", completed: true, rating: 5 },
    { animeId: 2, timestamp: "2024-03-01T22:00:00Z", completed: false },
  ]
};