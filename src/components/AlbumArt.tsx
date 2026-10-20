import React from 'react';
import { Disc3, Music2, Sparkles, Heart } from 'lucide-react';

interface AlbumArtProps {
  gradient: {
    from: string;
    via?: string;
    to: string;
    accent: string;
    icon: 'dholak' | 'tractor' | 'dj' | 'hookah' | 'dancer' | 'heart' | 'flute' | 'crown';
  };
  title: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isPlaying?: boolean;
}

export const AlbumArt: React.FC<AlbumArtProps> = ({
  gradient,
  title,
  size = 'md',
  isPlaying = false,
}) => {
  const sizeClasses = {
    sm: 'w-12 h-12 rounded-lg text-xs',
    md: 'w-20 h-20 sm:w-24 sm:h-24 rounded-xl text-sm',
    lg: 'w-36 h-36 sm:w-44 sm:h-44 rounded-2xl text-base',
    xl: 'w-56 h-56 sm:w-64 sm:h-64 rounded-3xl text-lg',
  }[size];

  // Distinct cultural SVG motifs
  const renderIcon = () => {
    switch (gradient.icon) {
      case 'dholak':
        return (
          <svg className="w-1/2 h-1/2 drop-shadow-md" viewBox="0 0 64 64" fill="none">
            {/* Dholak barrel */}
            <path d="M12 20 C24 16, 40 16, 52 20 L52 44 C40 48, 24 48, 12 44 Z" fill="currentColor" fillOpacity="0.85" />
            {/* Left rim */}
            <ellipse cx="12" cy="32" rx="4" ry="12" fill="#fff" fillOpacity="0.4" />
            {/* Right rim */}
            <ellipse cx="52" cy="32" rx="4" ry="12" fill="#fff" fillOpacity="0.4" />
            {/* Dholak lacing rope */}
            <line x1="16" y1="20" x2="32" y2="46" stroke="#fff" strokeWidth="1.5" strokeOpacity="0.7" />
            <line x1="32" y1="46" x2="48" y2="20" stroke="#fff" strokeWidth="1.5" strokeOpacity="0.7" />
            <line x1="16" y1="44" x2="32" y2="18" stroke="#fff" strokeWidth="1.5" strokeOpacity="0.7" />
            <line x1="32" y1="18" x2="48" y2="44" stroke="#fff" strokeWidth="1.5" strokeOpacity="0.7" />
          </svg>
        );
      case 'tractor':
        return (
          <svg className="w-1/2 h-1/2 drop-shadow-md" viewBox="0 0 64 64" fill="none">
            {/* Tractor body */}
            <path d="M18 26 L38 26 L42 34 L54 34 L54 44 L16 44 Z" fill="currentColor" fillOpacity="0.85" />
            {/* Silencer pipe / exhaust */}
            <rect x="44" y="16" width="3" height="12" fill="#fff" fillOpacity="0.8" />
            <path d="M47 16 C48 14, 52 14, 52 16" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
            {/* Front small wheel */}
            <circle cx="48" cy="46" r="8" fill="#1e293b" stroke="#fff" strokeWidth="2" />
            <circle cx="48" cy="46" r="3" fill="#cbd5e1" />
            {/* Big rear wheel */}
            <circle cx="22" cy="42" r="14" fill="#0f172a" stroke="#fff" strokeWidth="2.5" />
            <circle cx="22" cy="42" r="6" fill="#cbd5e1" />
          </svg>
        );
      case 'dj':
        return (
          <svg className="w-1/2 h-1/2 drop-shadow-md" viewBox="0 0 64 64" fill="none">
            {/* Turntable plate */}
            <circle cx="32" cy="32" r="24" fill="#0f172a" stroke="#fff" strokeWidth="1.5" strokeOpacity="0.4" />
            <circle cx="32" cy="32" r="18" stroke="#fff" strokeWidth="1" strokeDasharray="3 3" strokeOpacity="0.6" />
            <circle cx="32" cy="32" r="12" fill="currentColor" fillOpacity="0.85" />
            <circle cx="32" cy="32" r="4" fill="#fff" />
            {/* Tonearm */}
            <path d="M48 14 L36 28 L38 31" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        );
      case 'dancer':
        return (
          <svg className="w-1/2 h-1/2 drop-shadow-md" viewBox="0 0 64 64" fill="none">
            {/* Traditional Haryanvi Ghaghra / Daman swirl */}
            <circle cx="32" cy="16" r="5" fill="#fff" />
            <path d="M28 22 L36 22 L38 32 L26 32 Z" fill="#fff" fillOpacity="0.9" />
            <path d="M14 50 C18 36, 46 36, 50 50 C40 54, 24 54, 14 50 Z" fill="currentColor" fillOpacity="0.9" />
            <path d="M12 49 Q32 58 52 49" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
          </svg>
        );
      case 'heart':
        return <Heart className="w-1/2 h-1/2 fill-rose-300/40 text-white drop-shadow-md" />;
      case 'flute':
        return (
          <svg className="w-1/2 h-1/2 drop-shadow-md" viewBox="0 0 64 64" fill="none">
            {/* Bansuri / Flute */}
            <line x1="12" y1="48" x2="52" y2="16" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
            <circle cx="24" cy="38" r="1.5" fill="#fff" />
            <circle cx="30" cy="33" r="1.5" fill="#fff" />
            <circle cx="36" cy="28" r="1.5" fill="#fff" />
            <circle cx="42" cy="23" r="1.5" fill="#fff" />
            {/* Peacock feather flair */}
            <circle cx="16" cy="46" r="3" fill="#38bdf8" />
          </svg>
        );
      case 'crown':
        return (
          <svg className="w-1/2 h-1/2 drop-shadow-md" viewBox="0 0 64 64" fill="none">
            <path d="M14 42 L18 22 L28 32 L32 18 L36 32 L46 22 L50 42 Z" fill="currentColor" fillOpacity="0.85" stroke="#fff" strokeWidth="1.5" />
            <rect x="14" y="44" width="36" height="4" rx="2" fill="#fff" />
          </svg>
        );
      default:
        return (
          <svg className="w-1/2 h-1/2 drop-shadow-md" viewBox="0 0 64 64" fill="none">
            {/* Traditional Hookah */}
            <ellipse cx="32" cy="48" rx="14" ry="8" fill="currentColor" fillOpacity="0.9" />
            <rect x="30" y="24" width="4" height="24" fill="#cbd5e1" />
            <ellipse cx="32" cy="22" rx="7" ry="3" fill="#fff" />
            <path d="M36 36 C44 36, 48 40, 50 30" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
          </svg>
        );
    }
  };

  return (
    <div
      className={`relative overflow-hidden shrink-0 flex items-center justify-center bg-gradient-to-br ${gradient.from} ${
        gradient.via ? gradient.via : ''
      } ${gradient.to} text-white shadow-md select-none group ${sizeClasses}`}
    >
      {/* Vinyl record grooves watermark effect */}
      <div className="absolute inset-0 rounded-inherit opacity-20 pointer-events-none flex items-center justify-center">
        <div className="w-[85%] h-[85%] rounded-full border border-white/40" />
        <div className="absolute w-[60%] h-[60%] rounded-full border border-white/30" />
        <div className="absolute w-[35%] h-[35%] rounded-full border border-white/30" />
      </div>

      {/* Primary cultural icon */}
      <div className={`relative z-10 flex items-center justify-center text-white transition-transform duration-300 ${isPlaying ? 'scale-110' : 'group-hover:scale-105'}`}>
        {renderIcon()}
      </div>

      {/* Live Equalizer indicator when playing */}
      {isPlaying && (
        <div className="absolute bottom-1.5 right-1.5 z-20 flex items-end gap-0.5 h-3.5 px-1 py-0.5 bg-black/60 backdrop-blur-xs rounded">
          <span className="w-0.5 bg-amber-400 rounded-full animate-bounce [animation-duration:600ms]" style={{ height: '70%' }} />
          <span className="w-0.5 bg-amber-400 rounded-full animate-bounce [animation-duration:450ms]" style={{ height: '100%' }} />
          <span className="w-0.5 bg-amber-400 rounded-full animate-bounce [animation-duration:800ms]" style={{ height: '40%' }} />
        </div>
      )}
    </div>
  );
};
