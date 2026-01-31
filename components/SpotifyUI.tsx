
import React from 'react';

interface TabProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

export const SpotifyTab: React.FC<TabProps> = ({ label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 text-sm font-bold transition-all duration-200 border-b-2 ${
      active ? 'border-green-500 text-white' : 'border-transparent text-gray-400 hover:text-white'
    }`}
  >
    {label}
  </button>
);

interface ChipProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

export const SpotifyChip: React.FC<ChipProps> = ({ label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 whitespace-nowrap ${
      active ? 'bg-white text-black' : 'bg-[#2A2A2A] text-white hover:bg-[#3E3E3E]'
    }`}
  >
    {label}
  </button>
);

// Added 'disabled' prop to the SpotifyButton interface and implementation to fix the type error in ChallengeSheet.tsx
export const SpotifyButton: React.FC<{
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}> = ({ children, variant = 'primary', onClick, className = '', disabled }) => {
  const baseClasses = "px-8 py-3 rounded-full font-bold transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100";
  const variants = {
    primary: "bg-[#1DB954] text-black hover:bg-[#1ed760] hover:scale-105 disabled:hover:scale-100",
    secondary: "bg-white text-black hover:scale-105 disabled:hover:scale-100",
    outline: "bg-transparent border border-gray-500 text-white hover:border-white disabled:hover:border-gray-500"
  };

  return (
    <button 
      onClick={onClick} 
      className={`${baseClasses} ${variants[variant]} ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export const ProgressBar: React.FC<{ progress: number }> = ({ progress }) => (
  <div className="h-1.5 w-full bg-[#3E3E3E] rounded-full overflow-hidden">
    <div
      className="h-full bg-[#1DB954] transition-all duration-500 ease-out"
      style={{ width: `${progress}%` }}
    />
  </div>
);

export const SkeletonRow: React.FC = () => (
  <div className="flex items-center space-x-4 py-3 animate-pulse">
    <div className="w-4 h-4 bg-[#2A2A2A] rounded"></div>
    <div className="w-10 h-10 bg-[#2A2A2A] rounded-full"></div>
    <div className="flex-1 space-y-2">
      <div className="h-4 bg-[#2A2A2A] rounded w-1/3"></div>
      <div className="h-2 bg-[#2A2A2A] rounded w-full"></div>
    </div>
  </div>
);
