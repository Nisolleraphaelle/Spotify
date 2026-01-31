
import { Friend, Category } from './types';

export const FRIENDS_DATA: Friend[] = [
  {
    id: 'user_1',
    name: 'Toi (Lucas)',
    avatar: 'https://picsum.photos/seed/lucas/200',
    isUser: true,
    stats: {
      [Category.LISTENING]: { minutes: 1245, titles: 142, sessions: 45, delta: 12 },
      [Category.ARTISTS]: { count: 86, newDiscoveries: 12, topArtist: 'Daft Punk' },
      [Category.PLAYLISTS]: { likes: 34, completions: 5, delta: 2 }
    },
    topTracks: ['Get Lucky', 'Starboy', 'One More Time'],
    topArtists: ['Daft Punk', 'The Weeknd', 'Justice'],
    recentPlaylists: ['Techno Vibes', 'Late Night Drive']
  },
  {
    id: 'user_2',
    name: 'Sarah',
    avatar: 'https://picsum.photos/seed/sarah/200',
    isUser: false,
    stats: {
      [Category.LISTENING]: { minutes: 1890, titles: 210, sessions: 62, delta: 25 },
      [Category.ARTISTS]: { count: 112, newDiscoveries: 15, topArtist: 'Taylor Swift' },
      [Category.PLAYLISTS]: { likes: 56, completions: 8, delta: 4 }
    },
    topTracks: ['Anti-Hero', 'Cruel Summer', 'Blank Space'],
    topArtists: ['Taylor Swift', 'Lana Del Rey', 'Olivia Rodrigo'],
    recentPlaylists: ['Sad Girl Autumn', 'Daily Mix 1']
  },
  {
    id: 'user_3',
    name: 'Marc',
    avatar: 'https://picsum.photos/seed/marc/200',
    isUser: false,
    stats: {
      [Category.LISTENING]: { minutes: 980, titles: 88, sessions: 30, delta: -5 },
      [Category.ARTISTS]: { count: 45, newDiscoveries: 4, topArtist: 'Radiohead' },
      [Category.PLAYLISTS]: { likes: 12, completions: 2, delta: -1 }
    },
    topTracks: ['Creep', 'Karma Police', 'No Surprises'],
    topArtists: ['Radiohead', 'The Smile', 'Thom Yorke'],
    recentPlaylists: ['Melancholy', 'Indie Rock']
  },
  {
    id: 'user_4',
    name: 'Emma',
    avatar: 'https://picsum.photos/seed/emma/200',
    isUser: false,
    stats: {
      [Category.LISTENING]: { minutes: 1560, titles: 175, sessions: 50, delta: 8 },
      [Category.ARTISTS]: { count: 95, newDiscoveries: 20, topArtist: 'Rosalía' },
      [Category.PLAYLISTS]: { likes: 89, completions: 12, delta: 15 }
    },
    topTracks: ['DESPECHÁ', 'SAOKO', 'LA FAMA'],
    topArtists: ['Rosalía', 'Bad Bunny', 'Karol G'],
    recentPlaylists: ['Latino Fire', 'Workout Hits']
  },
  {
    id: 'user_5',
    name: 'Julien',
    avatar: 'https://picsum.photos/seed/julien/200',
    isUser: false,
    stats: {
      [Category.LISTENING]: { minutes: 450, titles: 50, sessions: 15, delta: -20 },
      [Category.ARTISTS]: { count: 22, newDiscoveries: 2, topArtist: 'Pink Floyd' },
      [Category.PLAYLISTS]: { likes: 15, completions: 1, delta: 0 }
    },
    topTracks: ['Money', 'Time', 'Comfortably Numb'],
    topArtists: ['Pink Floyd', 'Led Zeppelin', 'The Doors'],
    recentPlaylists: ['Classic Rock', 'Vinyl Collection']
  }
];
