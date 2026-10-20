import React from 'react';
import { Flame, Sparkles } from 'lucide-react';

interface TopBarProps {
  currentTab: string;
  onSelectTab: (tab: 'discover' | 'playlists' | 'artists' | 'lyrics' | 'djfx') => void;
  onRandomMix: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ currentTab, onSelectTab, onRandomMix }) => {
  return (
    <header className="sticky top-0 z-40 flex items-center justify-between gap-8 px-4 sm:px-6 lg:px-8 py-3.5 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80">
      {/* Zone 1: Single text element wordmark */}
      <button
        onClick={() => onSelectTab('discover')}
        className="text-lg sm:text-xl font-bold tracking-tight text-white hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 flex items-center gap-2 cursor-pointer font-display"
      >
        <span className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-500 to-red-600 flex items-center justify-center text-slate-950 shadow-md shadow-amber-500/20">
          <Flame className="w-5 h-5 fill-slate-950 stroke-slate-950" />
        </span>
        <span>HARYANVI BEATS</span>
      </button>

      {/* Zone 2: 4–5 clean single-line text navigation links */}
      <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-400">
        <button
          onClick={() => onSelectTab('discover')}
          className={`cursor-pointer transition-colors whitespace-nowrap shrink-0 pb-0.5 ${
            currentTab === 'discover'
              ? 'text-amber-400 border-b-2 border-amber-400 font-semibold'
              : 'hover:text-slate-200'
          }`}
        >
          Discover
        </button>
        <button
          onClick={() => onSelectTab('playlists')}
          className={`cursor-pointer transition-colors whitespace-nowrap shrink-0 pb-0.5 ${
            currentTab === 'playlists'
              ? 'text-amber-400 border-b-2 border-amber-400 font-semibold'
              : 'hover:text-slate-200'
          }`}
        >
          Playlists
        </button>
        <button
          onClick={() => onSelectTab('artists')}
          className={`cursor-pointer transition-colors whitespace-nowrap shrink-0 pb-0.5 ${
            currentTab === 'artists'
              ? 'text-amber-400 border-b-2 border-amber-400 font-semibold'
              : 'hover:text-slate-200'
          }`}
        >
          Artists
        </button>
        <button
          onClick={() => onSelectTab('lyrics')}
          className={`cursor-pointer transition-colors whitespace-nowrap shrink-0 pb-0.5 ${
            currentTab === 'lyrics'
              ? 'text-amber-400 border-b-2 border-amber-400 font-semibold'
              : 'hover:text-slate-200'
          }`}
        >
          Desi Bol
        </button>
        <button
          onClick={() => onSelectTab('djfx')}
          className={`cursor-pointer transition-colors whitespace-nowrap shrink-0 pb-0.5 ${
            currentTab === 'djfx'
              ? 'text-amber-400 border-b-2 border-amber-400 font-semibold'
              : 'hover:text-slate-200'
          }`}
        >
          DJ FX
        </button>
      </nav>

      {/* Zone 3: 1 primary action */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={onRandomMix}
          className="cursor-pointer inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 rounded-lg shadow-sm shadow-amber-500/20 active:scale-95 transition-all whitespace-nowrap shrink-0"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Surprise Mix</span>
        </button>
      </div>
    </header>
  );
};
