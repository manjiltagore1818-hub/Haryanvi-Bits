import React, { useState } from 'react';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Repeat,
  Repeat1,
  Shuffle,
  FileText,
  ListMusic,
  Maximize2,
  Heart,
  Zap,
} from 'lucide-react';
import { Song } from '../types/music';
import { AlbumArt } from './AlbumArt';
import { AudioVisualizer } from './AudioVisualizer';

interface PlayerBarProps {
  currentSong: Song | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  isBassBoost: boolean;
  volume: number;
  isShuffle: boolean;
  repeatMode: 'off' | 'all' | 'one';
  playbackRate: number;
  isFavorite: boolean;
  onPlayPause: () => void;
  onPrev: () => void;
  onNext: () => void;
  onSeek: (seconds: number) => void;
  onToggleBassBoost: () => void;
  onVolumeChange: (vol: number) => void;
  onToggleShuffle: () => void;
  onCycleRepeat: () => void;
  onCycleRate: () => void;
  onToggleFavorite: () => void;
  onOpenLyrics: () => void;
  onOpenQueue: () => void;
  onOpenFullPlayer: () => void;
}

export const PlayerBar: React.FC<PlayerBarProps> = ({
  currentSong,
  isPlaying,
  currentTime,
  duration,
  isBassBoost,
  volume,
  isShuffle,
  repeatMode,
  playbackRate,
  isFavorite,
  onPlayPause,
  onPrev,
  onNext,
  onSeek,
  onToggleBassBoost,
  onVolumeChange,
  onToggleShuffle,
  onCycleRepeat,
  onCycleRate,
  onToggleFavorite,
  onOpenLyrics,
  onOpenQueue,
  onOpenFullPlayer,
}) => {
  const [prevVolume, setPrevVolume] = useState(volume || 0.8);

  if (!currentSong) return null;

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = Math.floor(secs % 60);
    return `${mins}:${remainder < 10 ? '0' : ''}${remainder}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  const handleMuteToggle = () => {
    if (volume > 0) {
      setPrevVolume(volume);
      onVolumeChange(0);
    } else {
      onVolumeChange(prevVolume || 0.8);
    }
  };

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-50 bg-slate-950/95 backdrop-blur-xl border-t border-slate-800 shadow-2xl">
      {/* Top micro progress line for scrubber */}
      <div
        className="group relative w-full h-1.5 bg-slate-800/80 hover:h-2.5 transition-all cursor-pointer"
        onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const clickX = e.clientX - rect.left;
          const ratio = Math.max(0, Math.min(1, clickX / rect.width));
          onSeek(ratio * duration);
        }}
      >
        <div
          className={`h-full transition-all ${
            isBassBoost
              ? 'bg-gradient-to-r from-amber-500 via-red-500 to-amber-400'
              : 'bg-gradient-to-r from-amber-400 to-amber-500'
          }`}
          style={{ width: `${progressPercent}%` }}
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 -ml-2 w-3.5 h-3.5 bg-white rounded-full shadow-md scale-0 group-hover:scale-100 transition-transform pointer-events-none"
          style={{ left: `${progressPercent}%` }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 flex items-center justify-between gap-3 sm:gap-6">
        {/* Left Section: Song Info & Visualizer */}
        <div className="flex items-center gap-3 min-w-0 max-w-[40%] sm:max-w-xs shrink-0">
          <button
            onClick={onOpenFullPlayer}
            className="cursor-pointer shrink-0 transition-transform hover:scale-105 active:scale-95"
            title="Expand Full Player"
          >
            <AlbumArt
              gradient={currentSong.coverGradient}
              title={currentSong.title}
              size="sm"
              isPlaying={isPlaying}
            />
          </button>

          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <p
                onClick={onOpenFullPlayer}
                className="text-xs sm:text-sm font-semibold text-white truncate cursor-pointer hover:underline"
              >
                {currentSong.title}
              </p>
              <button
                onClick={onToggleFavorite}
                className={`p-1 transition-colors cursor-pointer shrink-0 ${
                  isFavorite ? 'text-rose-500' : 'text-slate-500 hover:text-slate-300'
                }`}
                title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
              >
                <Heart className={`w-3.5 h-3.5 ${isFavorite ? 'fill-rose-500' : ''}`} />
              </button>
            </div>
            <p className="text-[11px] text-slate-400 truncate">
              {currentSong.artist} · {currentSong.hindiTitle}
            </p>
          </div>
        </div>

        {/* Center Section: Primary Playback Controls */}
        <div className="flex flex-col items-center gap-1 shrink-0">
          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={onToggleShuffle}
              className={`p-1.5 rounded-md transition-colors cursor-pointer hidden sm:block ${
                isShuffle ? 'text-amber-400' : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Shuffle playback"
            >
              <Shuffle className="w-4 h-4" />
            </button>

            <button
              onClick={onPrev}
              className="p-1.5 text-slate-300 hover:text-white rounded-md transition-colors cursor-pointer active:scale-95"
              title="Previous song"
            >
              <SkipBack className="w-5 h-5 fill-current" />
            </button>

            <button
              onClick={onPlayPause}
              className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-lg active:scale-95 ${
                isPlaying
                  ? 'bg-amber-400 text-slate-950 hover:bg-amber-300 shadow-amber-500/20'
                  : 'bg-white text-slate-950 hover:bg-slate-200 shadow-white/20'
              }`}
              title={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 fill-current" />
              ) : (
                <Play className="w-5 h-5 fill-current ml-0.5" />
              )}
            </button>

            <button
              onClick={onNext}
              className="p-1.5 text-slate-300 hover:text-white rounded-md transition-colors cursor-pointer active:scale-95"
              title="Next song"
            >
              <SkipForward className="w-5 h-5 fill-current" />
            </button>

            <button
              onClick={onCycleRepeat}
              className={`p-1.5 rounded-md transition-colors cursor-pointer hidden sm:block ${
                repeatMode !== 'off' ? 'text-amber-400' : 'text-slate-400 hover:text-slate-200'
              }`}
              title={`Repeat: ${repeatMode}`}
            >
              {repeatMode === 'one' ? <Repeat1 className="w-4 h-4" /> : <Repeat className="w-4 h-4" />}
            </button>
          </div>

          {/* Time counters */}
          <div className="flex items-center gap-2 text-[10px] font-mono tabular-nums text-slate-400">
            <span>{formatTime(currentTime)}</span>
            <span>/</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Right Section: DJ Bass Boost, Volume & Tools */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          {/* DJ Bass Boost Button */}
          <button
            onClick={onToggleBassBoost}
            className={`cursor-pointer flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all shadow-sm ${
              isBassBoost
                ? 'bg-gradient-to-r from-red-600 to-amber-600 text-white shadow-red-500/30 ring-1 ring-amber-400 animate-pulse'
                : 'bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700'
            }`}
            title="Toggle DJ Bass Boost (Subwoofer 80Hz Boost)"
          >
            <Zap className={`w-3.5 h-3.5 ${isBassBoost ? 'fill-current' : ''}`} />
            <span className="hidden sm:inline">DJ BASS</span>
          </button>

          {/* Playback speed multiplier */}
          <button
            onClick={onCycleRate}
            className="hidden lg:block px-2 py-1 text-[11px] font-mono text-slate-400 hover:text-slate-200 bg-slate-800/80 rounded cursor-pointer"
            title="Playback Speed"
          >
            {playbackRate}x
          </button>

          {/* Volume control */}
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={handleMuteToggle}
              className="text-slate-400 hover:text-slate-200 cursor-pointer"
              title={volume === 0 ? 'Unmute' : 'Mute'}
            >
              {volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
              className="w-16 h-1 accent-amber-400 bg-slate-800 rounded-lg cursor-pointer"
              title="Volume"
            />
          </div>

          {/* Lyrics Button */}
          <button
            onClick={onOpenLyrics}
            className="p-1.5 text-slate-400 hover:text-amber-400 rounded-md transition-colors cursor-pointer"
            title="View Haryanvi Lyrics & Meaning"
          >
            <FileText className="w-4 h-4" />
          </button>

          {/* Queue Button */}
          <button
            onClick={onOpenQueue}
            className="p-1.5 text-slate-400 hover:text-amber-400 rounded-md transition-colors cursor-pointer"
            title="Play Queue"
          >
            <ListMusic className="w-4 h-4" />
          </button>

          {/* Expand Button */}
          <button
            onClick={onOpenFullPlayer}
            className="hidden sm:block p-1.5 text-slate-400 hover:text-slate-200 rounded-md transition-colors cursor-pointer"
            title="Full Screen View"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};
