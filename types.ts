
export enum Category {
  LISTENING = 'listening',
  ARTISTS = 'artists',
  PLAYLISTS = 'playlists'
}

export enum Period {
  WEEK = '7j',
  MONTH = '1m',
  SIX_MONTHS = '6m',
  YEAR = '1an'
}

export interface Friend {
  id: string;
  name: string;
  avatar: string;
  isUser: boolean;
  stats: {
    [Category.LISTENING]: {
      minutes: number;
      titles: number;
      sessions: number;
      delta: number;
    };
    [Category.ARTISTS]: {
      count: number;
      newDiscoveries: number;
      topArtist: string;
    };
    [Category.PLAYLISTS]: {
      likes: number;
      completions: number;
      delta: number;
    };
  };
  topTracks: string[];
  topArtists: string[];
  recentPlaylists: string[];
}

export interface Challenge {
  id: string;
  type: string;
  duration: string;
  participants: string[];
  status: 'active' | 'completed';
  winner?: string;
  startDate: string;
}
