
import React from 'react';
import { ArrowLeft, TrendingUp, TrendingDown, Share2, Swords } from 'lucide-react';
import { Friend, Category } from '../types';
import { SpotifyButton, ProgressBar } from './SpotifyUI';

interface FriendDetailProps {
  friend: Friend;
  onBack: () => void;
  onChallenge: () => void;
}

const FriendDetail: React.FC<FriendDetailProps> = ({ friend, onBack, onChallenge }) => {
  return (
    <div className="absolute inset-0 z-40 bg-[#121212] overflow-y-auto animate-in slide-in-from-right duration-300">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-[#121212]/80 backdrop-blur-md p-4 flex items-center justify-between">
        <button onClick={onBack} className="p-2 hover:bg-white/10 rounded-full transition-colors">
          <ArrowLeft size={24} />
        </button>
        <div className="flex gap-2">
          <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <Share2 size={20} />
          </button>
        </div>
      </div>

      <div className="px-6 pb-24">
        {/* Profile Info */}
        <div className="flex flex-col items-center mt-4 mb-8">
          <div className="relative">
            <img src={friend.avatar} alt={friend.name} className="w-32 h-32 rounded-full shadow-2xl mb-4 border-4 border-[#1DB954]/20" />
          </div>
          <h1 className="text-3xl font-bold">{friend.name}</h1>
          <p className="text-gray-400 text-sm mt-1">Niveau 12 • Passionné</p>
          <div className="flex gap-3 mt-6">
            <SpotifyButton onClick={onChallenge} className="flex items-center gap-2">
              <Swords size={18} />
              Défier
            </SpotifyButton>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-[#181818] p-4 rounded-2xl border border-[#282828]">
            <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">Temps total</p>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold">{friend.stats[Category.LISTENING].minutes}</span>
              <span className="text-xs text-gray-500">min</span>
            </div>
            <div className={`flex items-center text-xs mt-2 ${friend.stats[Category.LISTENING].delta >= 0 ? 'text-[#1DB954]' : 'text-red-500'}`}>
              {friend.stats[Category.LISTENING].delta >= 0 ? <TrendingUp size={14} className="mr-1" /> : <TrendingDown size={14} className="mr-1" />}
              {Math.abs(friend.stats[Category.LISTENING].delta)}% vs sem. dernière
            </div>
          </div>
          <div className="bg-[#181818] p-4 rounded-2xl border border-[#282828]">
            <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">Top Artiste</p>
            <div className="text-lg font-bold truncate">{friend.stats[Category.ARTISTS].topArtist}</div>
            <p className="text-xs text-gray-500 mt-2">{friend.stats[Category.ARTISTS].count} artistes écoutés</p>
          </div>
        </div>

        {/* Top Tracks */}
        <section className="mb-8">
          <h3 className="text-lg font-bold mb-4">Top Titres</h3>
          <div className="space-y-3">
            {friend.topTracks.map((track, i) => (
              <div key={track} className="flex items-center group cursor-pointer">
                <span className="w-6 text-gray-500 font-mono text-sm">{i + 1}</span>
                <img src={`https://picsum.photos/seed/${track}/100`} className="w-10 h-10 rounded mr-3 shadow-lg" alt="" />
                <div className="flex-1">
                  <div className="font-medium group-hover:text-[#1DB954] transition-colors">{track}</div>
                  <div className="text-xs text-gray-400">Single • 2024</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Top Artists */}
        <section className="mb-8">
          <h3 className="text-lg font-bold mb-4">Artistes Préférés</h3>
          <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
            {friend.topArtists.map(artist => (
              <div key={artist} className="flex-shrink-0 w-24 flex flex-col items-center">
                <img src={`https://picsum.photos/seed/${artist}/100`} className="w-24 h-24 rounded-full shadow-lg mb-2" alt="" />
                <span className="text-xs font-medium text-center truncate w-full">{artist}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Recent Playlists */}
        <section>
          <h3 className="text-lg font-bold mb-4">Playlists Marquantes</h3>
          <div className="grid grid-cols-2 gap-4">
            {friend.recentPlaylists.map(playlist => (
              <div key={playlist} className="bg-[#181818] p-3 rounded-lg hover:bg-[#282828] transition-colors cursor-pointer group">
                <img src={`https://picsum.photos/seed/${playlist}/200`} className="w-full aspect-square rounded shadow-xl mb-3" alt="" />
                <div className="font-bold text-sm truncate group-hover:text-[#1DB954]">{playlist}</div>
                <div className="text-xs text-gray-400">Playlist • Par {friend.name}</div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default FriendDetail;
