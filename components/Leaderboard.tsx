
import React, { useState, useMemo } from 'react';
import { Filter, Share2, TrendingUp, TrendingDown, Search, Trophy } from 'lucide-react';
import { Category, Period, Friend } from '../types';
import { FRIENDS_DATA } from '../mockData';
import { SpotifyTab, SpotifyChip, ProgressBar, SkeletonRow } from './SpotifyUI';
import FriendDetail from './FriendDetail';
import ChallengeSheet from './ChallengeSheet';

const SpotifyIcon = () => (
  <svg viewBox="0 0 24 24" fill="#1DB954" className="w-6 h-6">
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.503 17.306c-.22.36-.68.48-1.04.26-2.88-1.76-6.505-2.16-10.78-1.18-.41.1-.83-.16-.93-.57-.1-.41.16-.83.57-.93 4.673-1.066 8.673-.593 11.916 1.39.36.21.48.67.26 1.03zm1.465-3.26c-.276.45-.86.596-1.31.32-3.3-2.028-8.326-2.618-12.226-1.434-.506.154-1.043-.135-1.198-.64-.155-.506.134-1.043.64-1.198 4.46-1.353 10.007-.698 13.81 1.638.452.277.597.86.32 1.31zm.13-3.41c-3.957-2.35-10.476-2.565-14.256-1.417-.61.185-1.25-.166-1.435-.776-.184-.61.166-1.25.776-1.435 4.342-1.32 11.535-1.065 16.1 1.643.548.325.73 1.034.405 1.583-.325.548-1.034.73-1.583.405z"/>
  </svg>
);

const Leaderboard: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category>(Category.LISTENING);
  const [activePeriod, setActivePeriod] = useState<Period>(Period.WEEK);
  const [selectedFriend, setSelectedFriend] = useState<Friend | null>(null);
  const [isChallengeOpen, setIsChallengeOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Sorting logic based on selected category
  const sortedFriends = useMemo(() => {
    let list = [...FRIENDS_DATA];
    if (activeCategory === Category.LISTENING) {
      list.sort((a, b) => b.stats[Category.LISTENING].minutes - a.stats[Category.LISTENING].minutes);
    } else if (activeCategory === Category.ARTISTS) {
      list.sort((a, b) => b.stats[Category.ARTISTS].count - a.stats[Category.ARTISTS].count);
    } else {
      list.sort((a, b) => b.stats[Category.PLAYLISTS].likes - a.stats[Category.PLAYLISTS].likes);
    }
    return list;
  }, [activeCategory]);

  const maxStat = useMemo(() => {
    if (activeCategory === Category.LISTENING) return Math.max(...sortedFriends.map(f => f.stats[Category.LISTENING].minutes));
    if (activeCategory === Category.ARTISTS) return Math.max(...sortedFriends.map(f => f.stats[Category.ARTISTS].count));
    return Math.max(...sortedFriends.map(f => f.stats[Category.PLAYLISTS].likes));
  }, [sortedFriends, activeCategory]);

  const handleTabChange = (cat: Category) => {
    setIsLoading(true);
    setActiveCategory(cat);
    setTimeout(() => setIsLoading(false), 600);
  };

  return (
    <div className="flex flex-col h-full bg-[#121212] text-white">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-[#121212]/95 backdrop-blur-sm px-6 pt-6 pb-2">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <SpotifyIcon />
            <h1 className="text-2xl font-black tracking-tight">Classement Amis</h1>
          </div>
          <div className="flex gap-2 text-gray-400">
            <button className="p-2 hover:bg-white/10 hover:text-white rounded-full transition-colors"><Search size={20} /></button>
            <button className="p-2 hover:bg-white/10 hover:text-white rounded-full transition-colors"><Share2 size={20} /></button>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex space-x-2 border-b border-[#282828] mb-4">
          <SpotifyTab 
            label="Écoutes" 
            active={activeCategory === Category.LISTENING} 
            onClick={() => handleTabChange(Category.LISTENING)} 
          />
          <SpotifyTab 
            label="Artistes" 
            active={activeCategory === Category.ARTISTS} 
            onClick={() => handleTabChange(Category.ARTISTS)} 
          />
          <SpotifyTab 
            label="Playlists" 
            active={activeCategory === Category.PLAYLISTS} 
            onClick={() => handleTabChange(Category.PLAYLISTS)} 
          />
        </div>

        {/* Periods & Filters */}
        <div className="flex flex-col gap-3 py-2">
          <div className="flex gap-2 overflow-x-auto no-scrollbar">
            <SpotifyChip label="7 jours" active={activePeriod === Period.WEEK} onClick={() => setActivePeriod(Period.WEEK)} />
            <SpotifyChip label="1 mois" active={activePeriod === Period.MONTH} onClick={() => setActivePeriod(Period.MONTH)} />
            <SpotifyChip label="6 mois" active={activePeriod === Period.SIX_MONTHS} onClick={() => setActivePeriod(Period.SIX_MONTHS)} />
            <SpotifyChip label="1 an" active={activePeriod === Period.YEAR} onClick={() => setActivePeriod(Period.YEAR)} />
          </div>
          <div className="flex items-center gap-2 text-[#B3B3B3] text-xs font-bold px-1 uppercase tracking-tighter">
            <Filter size={14} />
            <span>Trier par : {activeCategory === Category.LISTENING ? 'Minutes' : activeCategory === Category.ARTISTS ? 'Artistes' : 'Likes'}</span>
          </div>
        </div>
      </header>

      {/* Leaderboard List */}
      <main className="flex-1 overflow-y-auto px-6 pt-4 pb-24">
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map(i => <SkeletonRow key={i} />)}
          </div>
        ) : (
          <div className="space-y-1">
            {sortedFriends.map((friend, index) => {
              const currentStatValue = 
                activeCategory === Category.LISTENING ? friend.stats[Category.LISTENING].minutes :
                activeCategory === Category.ARTISTS ? friend.stats[Category.ARTISTS].count :
                friend.stats[Category.PLAYLISTS].likes;
              
              const progress = (currentStatValue / maxStat) * 100;
              const delta = friend.stats[Category.LISTENING].delta;

              return (
                <div 
                  key={friend.id}
                  onClick={() => setSelectedFriend(friend)}
                  className={`flex items-center p-3 -mx-3 rounded-md transition-colors cursor-pointer group active:bg-black ${
                    friend.isUser ? 'bg-white/5' : 'hover:bg-white/10'
                  }`}
                >
                  {/* Rank */}
                  <div className="w-8 flex items-center justify-center font-bold text-sm">
                    {index === 0 ? <span className="text-yellow-500 text-lg">1</span> : 
                     index === 1 ? <span className="text-gray-400 text-lg">2</span> :
                     index === 2 ? <span className="text-amber-700 text-lg">3</span> : 
                     <span className="text-gray-500">{index + 1}</span>}
                  </div>

                  {/* Avatar */}
                  <div className="relative mx-3">
                    <img src={friend.avatar} alt={friend.name} className="w-12 h-12 rounded-full border-2 border-transparent group-hover:border-white/20 transition-all shadow-lg" />
                    {friend.isUser && <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#1DB954] border-2 border-[#121212] rounded-full" />}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className={`font-bold truncate text-sm ${friend.isUser ? 'text-[#1DB954]' : ''}`}>
                        {friend.name} {friend.isUser && '(Toi)'}
                      </h3>
                      <div className="flex items-center gap-1">
                        <span className="text-sm font-black">{currentStatValue.toLocaleString()}</span>
                        <span className="text-[10px] text-gray-400 uppercase tracking-tighter">
                          {activeCategory === Category.LISTENING ? 'min' : activeCategory === Category.ARTISTS ? 'art' : 'likes'}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="flex-1">
                        <ProgressBar progress={progress} />
                      </div>
                      <div className={`flex items-center text-[10px] font-bold ${delta >= 0 ? 'text-[#1DB954]' : 'text-red-500'}`}>
                        {delta >= 0 ? <TrendingUp size={10} className="mr-0.5" /> : <TrendingDown size={10} className="mr-0.5" />}
                        {Math.abs(delta)}%
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* Detail Overlay */}
      {selectedFriend && (
        <FriendDetail 
          friend={selectedFriend} 
          onBack={() => setSelectedFriend(null)} 
          onChallenge={() => {
            setIsChallengeOpen(true);
          }}
        />
      )}

      {/* Challenge Bottom Sheet */}
      <ChallengeSheet 
        isOpen={isChallengeOpen} 
        onClose={() => setIsChallengeOpen(false)} 
        friends={FRIENDS_DATA}
      />
    </div>
  );
};

export default Leaderboard;
