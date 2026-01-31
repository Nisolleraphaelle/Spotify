
import React, { useState } from 'react';
import { X, Trophy, Clock, Users, Music } from 'lucide-react';
import { SpotifyButton } from './SpotifyUI';
import { Friend } from '../types';

interface ChallengeSheetProps {
  isOpen: boolean;
  onClose: () => void;
  friends: Friend[];
}

const CHALLENGE_TYPES = [
  { id: 'minutes', label: 'Minutes d\'écoute', icon: Clock },
  { id: 'artists', label: 'Découvrir des artistes', icon: Music },
  { id: 'playlists', label: 'Finir une playlist', icon: Trophy },
];

const DURATIONS = ['24h', '7j', '30j'];

const ChallengeSheet: React.FC<ChallengeSheetProps> = ({ isOpen, onClose, friends }) => {
  const [step, setStep] = useState(1);
  const [selectedType, setSelectedType] = useState('minutes');
  const [selectedDuration, setSelectedDuration] = useState('7j');
  const [selectedFriends, setSelectedFriends] = useState<string[]>([]);

  if (!isOpen) return null;

  const toggleFriend = (id: string) => {
    setSelectedFriends(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const handleCreate = () => {
    // Logic for API integration later
    onClose();
    setStep(1);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-[#181818] w-full max-w-lg rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom duration-300">
        <div className="p-6 border-b border-[#282828] flex justify-between items-center">
          <h2 className="text-xl font-bold">Lancer un défi</h2>
          <button onClick={onClose} className="p-2 hover:bg-[#282828] rounded-full">
            <X size={24} />
          </button>
        </div>

        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <label className="text-sm font-bold text-gray-400 mb-3 block uppercase tracking-wider">Type de défi</label>
                <div className="grid grid-cols-1 gap-3">
                  {CHALLENGE_TYPES.map(type => (
                    <button
                      key={type.id}
                      onClick={() => setSelectedType(type.id)}
                      className={`flex items-center p-4 rounded-xl border-2 transition-all ${
                        selectedType === type.id ? 'border-[#1DB954] bg-[#282828]' : 'border-transparent bg-[#1A1A1A] hover:bg-[#282828]'
                      }`}
                    >
                      <type.icon className={`mr-4 ${selectedType === type.id ? 'text-[#1DB954]' : 'text-gray-400'}`} size={24} />
                      <span className="font-semibold">{type.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-bold text-gray-400 mb-3 block uppercase tracking-wider">Durée</label>
                <div className="flex gap-3">
                  {DURATIONS.map(d => (
                    <button
                      key={d}
                      onClick={() => setSelectedDuration(d)}
                      className={`flex-1 py-3 rounded-full font-bold transition-all ${
                        selectedDuration === d ? 'bg-white text-black' : 'bg-[#282828] text-white hover:bg-[#3E3E3E]'
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              <SpotifyButton onClick={() => setStep(2)} className="w-full">
                Suivant
              </SpotifyButton>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div>
                <label className="text-sm font-bold text-gray-400 mb-3 block uppercase tracking-wider">Sélectionner des amis</label>
                <div className="space-y-2">
                  {friends.filter(f => !f.isUser).map(friend => (
                    <button
                      key={friend.id}
                      onClick={() => toggleFriend(friend.id)}
                      className={`flex items-center w-full p-3 rounded-xl transition-all ${
                        selectedFriends.includes(friend.id) ? 'bg-[#282828]' : 'hover:bg-[#1A1A1A]'
                      }`}
                    >
                      <img src={friend.avatar} alt={friend.name} className="w-10 h-10 rounded-full mr-4" />
                      <span className="flex-1 text-left font-semibold">{friend.name}</span>
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        selectedFriends.includes(friend.id) ? 'bg-[#1DB954] border-[#1DB954]' : 'border-gray-500'
                      }`}>
                        {selectedFriends.includes(friend.id) && <div className="w-2 h-2 bg-black rounded-full" />}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-4">
                <SpotifyButton variant="outline" onClick={() => setStep(1)} className="flex-1">
                  Retour
                </SpotifyButton>
                <SpotifyButton onClick={handleCreate} className="flex-1" disabled={selectedFriends.length === 0}>
                  Confirmer
                </SpotifyButton>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChallengeSheet;
