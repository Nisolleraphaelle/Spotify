
/**
 * Application Spotify Social - Vanilla JavaScript Version
 */

// --- DATA ---
const FRIENDS_DATA = [
  {
    id: 'user_1',
    name: 'Toi (Lucas)',
    avatar: 'https://picsum.photos/seed/lucas/200',
    isUser: true,
    stats: {
      listening: { minutes: 1245, delta: 12 },
      artists: { count: 86, topArtist: 'Daft Punk' },
      playlists: { likes: 34 }
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
      listening: { minutes: 1890, delta: 25 },
      artists: { count: 112, topArtist: 'Taylor Swift' },
      playlists: { likes: 56 }
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
      listening: { minutes: 980, delta: -5 },
      artists: { count: 45, topArtist: 'Radiohead' },
      playlists: { likes: 12 }
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
      listening: { minutes: 1560, delta: 8 },
      artists: { count: 95, topArtist: 'Rosalía' },
      playlists: { likes: 89 }
    },
    topTracks: ['DESPECHÁ', 'SAOKO', 'LA FAMA'],
    topArtists: ['Rosalía', 'Bad Bunny', 'Karol G'],
    recentPlaylists: ['Latino Fire', 'Workout Hits']
  }
];

// --- STATE ---
let state = {
  activeTab: 'amis',
  category: 'listening', // 'listening', 'artists', 'playlists'
  period: '7j',
  selectedFriendId: null,
  isChallengeOpen: false
};

// --- UTILS ---
const updateState = (newState) => {
  state = { ...state, ...newState };
  render();
};

const getSortedFriends = () => {
  return [...FRIENDS_DATA].sort((a, b) => {
    if (state.category === 'listening') return b.stats.listening.minutes - a.stats.listening.minutes;
    if (state.category === 'artists') return b.stats.artists.count - a.stats.artists.count;
    return b.stats.playlists.likes - a.stats.playlists.likes;
  });
};

// --- COMPONENTS ---

const SpotifyLogo = () => `
  <div class="px-5 py-6 flex items-center gap-2">
    <svg viewBox="0 0 24 24" fill="#1DB954" class="w-10 h-10">
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.503 17.306c-.22.36-.68.48-1.04.26-2.88-1.76-6.505-2.16-10.78-1.18-.41.1-.83-.16-.93-.57-.1-.41.16-.83.57-.93 4.673-1.066 8.673-.593 11.916 1.39.36.21.48.67.26 1.03zm1.465-3.26c-.276.45-.86.596-1.31.32-3.3-2.028-8.326-2.618-12.226-1.434-.506.154-1.043-.135-1.198-.64-.155-.506.134-1.043.64-1.198 4.46-1.353 10.007-.698 13.81 1.638.452.277.597.86.32 1.31zm.13-3.41c-3.957-2.35-10.476-2.565-14.256-1.417-.61.185-1.25-.166-1.435-.776-.184-.61.166-1.25.776-1.435 4.342-1.32 11.535-1.065 16.1 1.643.548.325.73 1.034.405 1.583-.325.548-1.034.73-1.583.405z"/>
    </svg>
    <span class="text-2xl font-black tracking-tighter">Spotify</span>
  </div>
`;

const NavItem = (icon, label, id) => `
  <button 
    onclick="window.navTo('${id}')"
    class="flex items-center w-full px-4 py-3 rounded-md transition-all ${state.activeTab === id ? 'text-[#1DB954] bg-white/5' : 'text-gray-400 hover:text-white hover:bg-white/5'}"
  >
    <i data-lucide="${icon}" class="mr-4"></i>
    <span class="font-bold">${label}</span>
  </button>
`;

const LeaderboardRow = (friend, index, maxStat) => {
  const currentStat = state.category === 'listening' ? friend.stats.listening.minutes :
                     state.category === 'artists' ? friend.stats.artists.count :
                     friend.stats.playlists.likes;
  const progress = (currentStat / maxStat) * 100;
  const unit = state.category === 'listening' ? 'min' : state.category === 'artists' ? 'art' : 'likes';
  const delta = friend.stats.listening.delta;

  return `
    <div 
      onclick="window.selectFriend('${friend.id}')"
      class="flex items-center p-3 -mx-3 rounded-md transition-colors cursor-pointer group active:bg-black ${friend.isUser ? 'bg-white/5' : 'hover:bg-white/10'} animate-fade-in"
      style="animation-delay: ${index * 50}ms"
    >
      <div class="w-8 flex items-center justify-center font-bold text-sm">
        ${index === 0 ? '<span class="text-yellow-500 text-lg">1</span>' : 
          index === 1 ? '<span class="text-gray-400 text-lg">2</span>' :
          index === 2 ? '<span class="text-amber-700 text-lg">3</span>' : 
          `<span class="text-gray-500">${index + 1}</span>`}
      </div>
      <div class="relative mx-3">
        <img src="${friend.avatar}" class="w-12 h-12 rounded-full shadow-lg" />
        ${friend.isUser ? '<div class="absolute -bottom-1 -right-1 w-4 h-4 bg-[#1DB954] border-2 border-[#121212] rounded-full"></div>' : ''}
      </div>
      <div class="flex-1 min-w-0">
        <div class="flex items-center justify-between mb-1">
          <h3 class="font-bold truncate text-sm ${friend.isUser ? 'text-[#1DB954]' : ''}">${friend.name}</h3>
          <div class="flex items-center gap-1">
            <span class="text-sm font-black">${currentStat.toLocaleString()}</span>
            <span class="text-[10px] text-gray-400 uppercase tracking-tighter">${unit}</span>
          </div>
        </div>
        <div class="flex items-center gap-3">
          <div class="flex-1 h-1.5 bg-[#3E3E3E] rounded-full overflow-hidden">
            <div class="h-full bg-[#1DB954] transition-all duration-700" style="width: ${progress}%"></div>
          </div>
          <div class="flex items-center text-[10px] font-bold ${delta >= 0 ? 'text-[#1DB954]' : 'text-red-500'}">
            <i data-lucide="${delta >= 0 ? 'trending-up' : 'trending-down'}" class="w-3 h-3 mr-0.5"></i>
            ${Math.abs(delta)}%
          </div>
        </div>
      </div>
    </div>
  `;
};

const FriendDetailOverlay = () => {
  const friend = FRIENDS_DATA.find(f => f.id === state.selectedFriendId);
  if (!friend) return '';

  return `
    <div class="fixed inset-0 z-50 bg-[#121212] overflow-y-auto animate-fade-in">
      <div class="sticky top-0 z-50 bg-[#121212]/80 backdrop-blur-md p-4 flex items-center justify-between">
        <button onclick="window.selectFriend(null)" class="p-2 hover:bg-white/10 rounded-full">
          <i data-lucide="arrow-left"></i>
        </button>
        <button class="p-2 hover:bg-white/10 rounded-full"><i data-lucide="share-2"></i></button>
      </div>

      <div class="px-6 pb-24 max-w-2xl mx-auto">
        <div class="flex flex-col items-center mt-4 mb-8">
          <img src="${friend.avatar}" class="w-32 h-32 rounded-full shadow-2xl mb-4 border-4 border-[#1DB954]/20" />
          <h1 class="text-3xl font-bold">${friend.name}</h1>
          <p class="text-gray-400 text-sm mt-1">Niveau 12 • Passionné</p>
          <button 
            onclick="window.toggleChallenge(true)"
            class="mt-6 flex items-center gap-2 bg-[#1DB954] text-black px-8 py-3 rounded-full font-bold hover:scale-105 transition-all"
          >
            <i data-lucide="swords" class="w-5 h-5"></i> Défier
          </button>
        </div>

        <section class="mb-8">
          <h3 class="text-lg font-bold mb-4">Top Titres</h3>
          <div class="space-y-3">
            ${friend.topTracks.map((t, i) => `
              <div class="flex items-center group cursor-pointer">
                <span class="w-6 text-gray-500 font-mono text-sm">${i + 1}</span>
                <img src="https://picsum.photos/seed/${t}/100" class="w-10 h-10 rounded mr-3" />
                <div class="flex-1">
                  <div class="font-medium group-hover:text-[#1DB954]">${t}</div>
                  <div class="text-xs text-gray-400">Single</div>
                </div>
              </div>
            `).join('')}
          </div>
        </section>
      </div>
    </div>
  `;
};

const ChallengeSheet = () => {
  if (!state.isChallengeOpen) return '';
  return `
    <div class="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-4">
      <div class="bg-[#181818] w-full max-w-lg rounded-t-3xl sm:rounded-3xl shadow-2xl p-6">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-xl font-bold">Lancer un défi</h2>
          <button onclick="window.toggleChallenge(false)" class="p-2 hover:bg-[#282828] rounded-full"><i data-lucide="x"></i></button>
        </div>
        <div class="space-y-4">
          <div class="p-4 bg-[#282828] rounded-xl flex items-center cursor-pointer border-2 border-[#1DB954]">
             <i data-lucide="clock" class="text-[#1DB954] mr-4"></i>
             <span class="font-bold">Minutes d'écoute (7 jours)</span>
          </div>
          <div class="p-4 bg-[#1A1A1A] rounded-xl flex items-center cursor-pointer hover:bg-[#282828]">
             <i data-lucide="music" class="text-gray-400 mr-4"></i>
             <span class="font-bold">Découvrir 10 artistes</span>
          </div>
          <button 
            onclick="window.toggleChallenge(false)"
            class="w-full bg-[#1DB954] text-black py-4 rounded-full font-bold mt-4"
          >
            Confirmer le défi
          </button>
        </div>
      </div>
    </div>
  `;
};

// --- GLOBAL ACTIONS ---
// Fix: Use 'any' casting on window to assign global action handlers and bypass TypeScript property check
(window as any).navTo = (id) => updateState({ activeTab: id });
// Fix: Use 'any' casting on window to assign global action handlers and bypass TypeScript property check
(window as any).setCategory = (cat) => updateState({ category: cat });
// Fix: Use 'any' casting on window to assign global action handlers and bypass TypeScript property check
(window as any).setPeriod = (per) => updateState({ period: per });
// Fix: Use 'any' casting on window to assign global action handlers and bypass TypeScript property check
(window as any).selectFriend = (id) => updateState({ selectedFriendId: id });
// Fix: Use 'any' casting on window to assign global action handlers and bypass TypeScript property check
(window as any).toggleChallenge = (open) => updateState({ isChallengeOpen: open });

// --- RENDER ---
const render = () => {
  const root = document.getElementById('root');
  const sortedFriends = getSortedFriends();
  const maxStatValue = Math.max(...sortedFriends.map(f => {
    if (state.category === 'listening') return f.stats.listening.minutes;
    if (state.category === 'artists') return f.stats.artists.count;
    return f.stats.playlists.likes;
  }));

  root.innerHTML = `
    <div class="flex-1 flex overflow-hidden">
      <!-- Sidebar Desktop -->
      <aside class="hidden md:flex flex-col w-64 bg-black border-r border-[#282828]">
        ${SpotifyLogo()}
        <nav class="p-2 space-y-1">
          ${NavItem('home', 'Accueil', 'home')}
          ${NavItem('search', 'Rechercher', 'search')}
          ${NavItem('users', 'Classement Amis', 'amis')}
        </nav>
      </aside>

      <!-- Main Content -->
      <main class="flex-1 relative overflow-hidden flex flex-col bg-[#121212]">
        ${state.activeTab === 'amis' ? `
          <header class="p-6 sticky top-0 z-20 bg-[#121212]/95 backdrop-blur-sm">
            <div class="flex items-center justify-between mb-8">
              <h1 class="text-3xl font-black tracking-tight">Classement Amis</h1>
              <div class="flex gap-4">
                 <button class="p-2 hover:bg-white/10 rounded-full"><i data-lucide="search"></i></button>
                 <button class="p-2 hover:bg-white/10 rounded-full"><i data-lucide="share-2"></i></button>
              </div>
            </div>

            <div class="flex border-b border-[#282828] mb-6">
              ${['listening', 'artists', 'playlists'].map(cat => `
                <button 
                  onclick="window.setCategory('${cat}')"
                  class="px-6 py-2 font-bold text-sm transition-all border-b-2 ${state.category === cat ? 'border-[#1DB954] text-white' : 'border-transparent text-gray-400 hover:text-white'}"
                >
                  ${cat === 'listening' ? 'Écoutes' : cat === 'artists' ? 'Artistes' : 'Playlists'}
                </button>
              `).join('')}
            </div>

            <div class="flex gap-2 overflow-x-auto no-scrollbar mb-4">
              ${['7j', '1m', '6m', '1an'].map(per => `
                <button 
                  onclick="window.setPeriod('${per}')"
                  class="px-4 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap ${state.period === per ? 'bg-white text-black' : 'bg-[#2A2A2A] text-white hover:bg-[#3E3E3E]'}"
                >
                  ${per}
                </button>
              `).join('')}
            </div>
          </header>

          <div class="flex-1 overflow-y-auto px-6 pb-32">
            <div class="space-y-1">
              ${sortedFriends.map((f, i) => LeaderboardRow(f, i, maxStatValue)).join('')}
            </div>
          </div>
        ` : `
          <div class="flex-1 flex items-center justify-center text-center p-12">
            <div>
              <h2 class="text-4xl font-black mb-4">Vue bientôt disponible</h2>
              <button onclick="window.navTo('amis')" class="bg-[#1DB954] text-black px-8 py-3 rounded-full font-bold">Retour au Classement</button>
            </div>
          </div>
        `}

        ${FriendDetailOverlay()}
        ${ChallengeSheet()}
      </main>
    </div>

    <!-- Mobile Nav -->
    <nav class="md:hidden flex h-16 bg-black border-t border-white/10 items-center justify-around z-50">
      <button onclick="window.navTo('home')" class="flex flex-col items-center ${state.activeTab === 'home' ? 'text-white' : 'text-gray-400'}">
        <i data-lucide="home"></i><span class="text-[10px] mt-1 font-bold">Accueil</span>
      </button>
      <button onclick="window.navTo('amis')" class="flex flex-col items-center ${state.activeTab === 'amis' ? 'text-white' : 'text-gray-400'}">
        <i data-lucide="users"></i><span class="text-[10px] mt-1 font-bold">Amis</span>
      </button>
    </nav>

    <!-- Player Bar -->
    <footer class="h-20 bg-black border-t border-[#282828] flex items-center px-4 justify-between z-40">
       <div class="flex items-center w-1/3 min-w-0">
          <img src="https://picsum.photos/seed/track/100" class="w-12 h-12 rounded mr-3 shadow-lg" />
          <div class="truncate">
            <div class="text-sm font-bold truncate">Starboy</div>
            <div class="text-xs text-gray-400 truncate">The Weeknd</div>
          </div>
       </div>
       <div class="flex flex-col items-center w-1/3">
          <div class="flex items-center gap-6">
            <i data-lucide="skip-back" class="w-5 h-5 text-gray-400 hover:text-white cursor-pointer"></i>
            <div class="w-8 h-8 bg-white rounded-full flex items-center justify-center text-black hover:scale-105 transition-all cursor-pointer">
               <i data-lucide="play" class="w-4 h-4 fill-current"></i>
            </div>
            <i data-lucide="skip-forward" class="w-5 h-5 text-gray-400 hover:text-white cursor-pointer"></i>
          </div>
       </div>
       <div class="w-1/3 flex justify-end">
          <i data-lucide="volume-2" class="w-5 h-5 text-gray-400"></i>
       </div>
    </footer>
  `;

  // Réinitialiser les icônes Lucide après chaque rendu
  // Fix: Access lucide from window and cast to any to resolve the 'Cannot find name lucide' error
  (window as any).lucide.createIcons();
};

// Premier rendu
render();