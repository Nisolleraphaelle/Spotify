
import React, { useState } from 'react';
import { Home, Search, Library, Users, Play, SkipBack, SkipForward, Repeat, Shuffle, Volume2 } from 'lucide-react';
import Leaderboard from './components/Leaderboard';

const SpotifyLogo = ({ className = "w-8 h-8" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="#1DB954" className={className}>
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.503 17.306c-.22.36-.68.48-1.04.26-2.88-1.76-6.505-2.16-10.78-1.18-.41.1-.83-.16-.93-.57-.1-.41.16-.83.57-.93 4.673-1.066 8.673-.593 11.916 1.39.36.21.48.67.26 1.03zm1.465-3.26c-.276.45-.86.596-1.31.32-3.3-2.028-8.326-2.618-12.226-1.434-.506.154-1.043-.135-1.198-.64-.155-.506.134-1.043.64-1.198 4.46-1.353 10.007-.698 13.81 1.638.452.277.597.86.32 1.31zm.13-3.41c-3.957-2.35-10.476-2.565-14.256-1.417-.61.185-1.25-.166-1.435-.776-.184-.61.166-1.25.776-1.435 4.342-1.32 11.535-1.065 16.1 1.643.548.325.73 1.034.405 1.583-.325.548-1.034.73-1.583.405z"/>
  </svg>
);

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('amis');

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-black text-white">
      {/* Desktop Main Viewport */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar (Desktop) */}
        <aside className="hidden md:flex flex-col w-64 bg-black p-2 space-y-2 border-r border-[#282828]">
          {/* Logo Section */}
          <div className="px-5 py-4 flex items-center gap-2 group cursor-pointer">
            <SpotifyLogo className="w-10 h-10" />
            <span className="text-2xl font-black tracking-tighter">Spotify</span>
          </div>

          <nav className="bg-[#121212] rounded-lg p-3 space-y-1">
            <button 
              onClick={() => setActiveTab('home')}
              className={`flex items-center w-full px-4 py-3 rounded-md transition-all ${activeTab === 'home' ? 'text-white bg-white/5' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
            >
              <Home className="mr-4" size={24} />
              <span className="font-bold">Accueil</span>
            </button>
            <button 
              onClick={() => setActiveTab('search')}
              className={`flex items-center w-full px-4 py-3 rounded-md transition-all ${activeTab === 'search' ? 'text-white bg-white/5' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
            >
              <Search className="mr-4" size={24} />
              <span className="font-bold">Rechercher</span>
            </button>
          </nav>
          
          <nav className="flex-1 bg-[#121212] rounded-lg p-3 overflow-hidden flex flex-col">
            <div className="flex items-center justify-between px-4 py-2 mb-2">
              <div className="flex items-center text-gray-400 hover:text-white transition-colors cursor-pointer">
                <Library className="mr-3" size={24} />
                <span className="font-bold">Bibliothèque</span>
              </div>
            </div>
            <button 
              onClick={() => setActiveTab('amis')}
              className={`flex items-center w-full px-4 py-3 rounded-md transition-all mb-4 ${activeTab === 'amis' ? 'text-[#1DB954] bg-white/5' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
            >
              <Users className="mr-4" size={24} />
              <span className="font-bold">Classement Amis</span>
            </button>
            
            <div className="flex-1 overflow-y-auto space-y-1">
              {['Mes favoris', 'Découvertes', 'Workout Mix', 'Late Night'].map(playlist => (
                <div key={playlist} className="px-4 py-2 text-sm text-gray-400 hover:text-white cursor-pointer truncate">
                  {playlist}
                </div>
              ))}
            </div>
          </nav>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 relative overflow-hidden bg-[#121212]">
          {activeTab === 'amis' ? (
            <Leaderboard />
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center p-12 space-y-4">
              <h2 className="text-4xl font-black">Prêt pour l'écoute ?</h2>
              <p className="text-gray-400 max-w-md">Découvrez ce que vos amis écoutent dans l'onglet Classement pour pimenter votre expérience musicale.</p>
              <button 
                onClick={() => setActiveTab('amis')}
                className="bg-[#1DB954] text-black px-8 py-3 rounded-full font-bold hover:scale-105 active:scale-95 transition-all"
              >
                Voir le Classement
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Now Playing Bar (Desktop/Global) */}
      <footer className="h-24 bg-black border-t border-[#282828] flex items-center px-4 justify-between">
        {/* Track Info */}
        <div className="flex items-center w-1/3">
          <img src="https://picsum.photos/seed/current/100" className="w-14 h-14 rounded shadow-lg mr-4" alt="Album" />
          <div className="flex flex-col">
            <span className="text-white text-sm font-semibold hover:underline cursor-pointer">Starboy</span>
            <span className="text-gray-400 text-xs hover:underline cursor-pointer">The Weeknd</span>
          </div>
        </div>

        {/* Player Controls */}
        <div className="flex flex-col items-center w-1/3">
          <div className="flex items-center gap-6 mb-2">
            <Shuffle size={20} className="text-[#1DB954] cursor-pointer" />
            <SkipBack size={24} className="text-gray-300 hover:text-white cursor-pointer" />
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-black hover:scale-105 transition-transform cursor-pointer">
              <Play size={20} fill="currentColor" />
            </div>
            <SkipForward size={24} className="text-gray-300 hover:text-white cursor-pointer" />
            <Repeat size={20} className="text-gray-400 cursor-pointer" />
          </div>
          <div className="w-full max-w-md flex items-center gap-2">
            <span className="text-[10px] text-gray-400">1:24</span>
            <div className="flex-1 h-1 bg-[#3E3E3E] rounded-full group cursor-pointer relative">
              <div className="absolute top-0 left-0 h-full bg-white group-hover:bg-[#1DB954] w-1/3 rounded-full" />
            </div>
            <span className="text-[10px] text-gray-400">3:50</span>
          </div>
        </div>

        {/* System Controls */}
        <div className="flex items-center justify-end w-1/3 gap-3">
          <Volume2 size={20} className="text-gray-400" />
          <div className="w-24 h-1 bg-[#3E3E3E] rounded-full relative overflow-hidden">
             <div className="absolute top-0 left-0 h-full bg-white w-2/3" />
          </div>
        </div>
      </footer>

      {/* Bottom Nav (Mobile Only) */}
      <nav className="md:hidden flex h-16 bg-black/90 backdrop-blur-lg border-t border-white/10 items-center justify-around">
        <button 
          onClick={() => setActiveTab('home')}
          className={`flex flex-col items-center ${activeTab === 'home' ? 'text-white' : 'text-gray-400'}`}
        >
          <Home size={24} />
          <span className="text-[10px] mt-1 font-medium">Accueil</span>
        </button>
        <button 
          onClick={() => setActiveTab('search')}
          className={`flex flex-col items-center ${activeTab === 'search' ? 'text-white' : 'text-gray-400'}`}
        >
          <Search size={24} />
          <span className="text-[10px] mt-1 font-medium">Rechercher</span>
        </button>
        <button 
          onClick={() => setActiveTab('amis')}
          className={`flex flex-col items-center ${activeTab === 'amis' ? 'text-white' : 'text-gray-400'}`}
        >
          <Users size={24} />
          <span className="text-[10px] mt-1 font-medium">Amis</span>
        </button>
      </nav>
    </div>
  );
};

export default App;
