import React, { useState } from 'react';
import {
  X,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Repeat,
  Repeat1,
  Shuffle,
  Zap,
  FileText,
  ListMusic,
  Heart,
  Share2,
} from 'lucide-react';
import { Song } from '../types/music';
import { AlbumArt } from './AlbumArt';
import { AudioVisualizer } from './AudioVisualizer';

interface FullPlayerModalProps {
  song: Song | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  isBassBoost: boolean;
  volume: number;
  isShuffle: boolean;
  repeatMode: 'off' | 'all' | 'one';
  isFavorite: boolean;
  onClose: () => void;
  onPlayPause: () => void;
  onPrev: () => void;
  onNext: () => void;
  onSeek: (seconds: number) => void;
  onToggleBassBoost: () => void;
  onVolumeChange: (vol: number) => void;
  onToggleShuffle: () => void;
  onCycleRepeat: () => void;
  onToggleFavorite: () => void;
  onOpenLyrics: () => void;
}

export const FullPlayerModal: React.FC<FullPlayerModalProps> = ({
  song,
  isPlaying,
  currentTime,
  duration,
  isBassBoost,
  volume,
  isShuffle,
  repeatMode,
  isFavorite,
  onClose,
  onPlayPause,
  onPrev,
  onNext,
  onSeek,
  onToggleBassBoost,
  onVolumeChange,
  onToggleShuffle,
  onCycleRepeat,
  onToggleFavorite,
  onOpenLyrics,
}) => {
  const [copied, setCopied] = useState(false);

  if (!song) return null;

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = Math.floor(secs % 60);
    return `${mins}:${remainder < 10 ? '0' : ''}${remainder}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  const handleShare = () => {
    navigator.clipboard?.writeText(
      `Listening to "${song.title} (${song.hindiTitle})" by ${song.artist} on Haryanvi Beats!`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/95 backdrop-blur-2xl animate-in fade-in duration-250">
      <div className="relative w-full max-w-xl max-h-[92vh] flex flex-col items-center justify-between p-6 sm:p-8 bg-slate-900/90 border border-slate-800 rounded-3xl shadow-2xl overflow-y-auto">
        {/* Top bar in modal */}
        <div className="w-full flex items-center justify-between text-slate-400 mb-4">
          <div className="text-xs font-semibold tracking-wider text-amber-400">
            NOW PLAYING · HARYANVI BEATS
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
              title="Share track info"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
              title="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {copied && (
          <div className="w-full text-center py-1.5 px-3 bg-amber-500/20 text-amber-300 text-xs rounded-lg mb-3">
            Track info copied to clipboard!
          </div>
        )}

        {/* Giant Album Art */}
        <div className="my-3 sm:my-5 flex flex-col items-center justify-center relative">
          <AlbumArt
            gradient={song.coverGradient}
            title={song.title}
            size="xl"
            isPlaying={isPlaying}
          />
        </div>

        {/* Song titles & metadata */}
        <div className="w-full text-center mt-2">
          <div className="flex items-center justify-center gap-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
              {song.title}
            </h2>
            <button
              onClick={onToggleFavorite}
              className={`p-1.5 transition-colors cursor-pointer ${
                isFavorite ? 'text-rose-500' : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              <Heart className={`w-5 h-5 ${isFavorite ? 'fill-rose-500' : ''}`} />
            </button>
          </div>

          <p className="text-base text-amber-400 font-medium mt-0.5">
            {song.hindiTitle}
          </p>

          <p className="text-sm text-slate-400 mt-1">
            {song.artist} <span className="text-slate-600">·</span> {song.starring}
          </p>

          <div className="flex items-center justify-center gap-2 text-xs text-slate-500 mt-2">
            <span>Year {song.year}</span>
            <span>·</span>
            <span>{song.plays} Plays</span>
            <span>·</span>
            <span>{song.audioProfile.bpm} BPM</span>
          </div>
        </div>

        {/* Audio Visualizer strip */}
        <div className="w-full my-4 px-2">
          <AudioVisualizer
            isPlaying={isPlaying}
            accentColor={song.coverGradient.accent}
            isBassBoosted={isBassBoost}
          />
        </div>

        {/* Scrubber & Duration */}
        <div className="w-full space-y-1.5">
          <div
            className="group relative w-full h-2 bg-slate-800 rounded-full cursor-pointer hover:h-3 transition-all"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const clickX = e.clientX - rect.left;
              const ratio = Math.max(0, Math.min(1, clickX / rect.width));
              onSeek(ratio * duration);
            }}
          >
            <div
              className={`h-full rounded-full transition-all ${
                isBassBoost
                  ? 'bg-gradient-to-r from-red-500 to-amber-400'
                  : 'bg-gradient-to-r from-amber-400 to-amber-500'
              }`}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-xs font-mono tabular-nums text-slate-400">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Primary Playback controls */}
        <div className="w-full flex items-center justify-between gap-4 mt-4 px-4">
          <button
            onClick={onToggleShuffle}
            className={`p-2.5 rounded-full transition-colors cursor-pointer ${
              isShuffle ? 'text-amber-400 bg-amber-500/10' : 'text-slate-400 hover:text-white'
            }`}
            title="Shuffle"
          >
            <Shuffle className="w-5 h-5" />
          </button>

          <button
            onClick={onPrev}
            className="p-3 text-slate-200 hover:text-white transition-colors cursor-pointer active:scale-95"
            title="Previous"
          >
            <SkipBack className="w-7 h-7 fill-current" />
          </button>

          <button
            onClick={onPlayPause}
            className={`w-16 h-16 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-xl active:scale-95 ${
              isPlaying
                ? 'bg-amber-400 text-slate-950 hover:bg-amber-300 shadow-amber-500/30'
                : 'bg-white text-slate-950 hover:bg-slate-200 shadow-white/30'
            }`}
            title={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? (
              <Pause className="w-8 h-8 fill-current" />
            ) : (
              <Play className="w-8 h-8 fill-current ml-1" />
            )}
          </button>

          <button
            onClick={onNext}
            className="p-3 text-slate-200 hover:text-white transition-colors cursor-pointer active:scale-95"
            title="Next"
          >
            <SkipForward className="w-7 h-7 fill-current" />
          </button>

          <button
            onClick={onCycleRepeat}
            className={`p-2.5 rounded-full transition-colors cursor-pointer ${
              repeatMode !== 'off' ? 'text-amber-400 bg-amber-500/10' : 'text-slate-400 hover:text-white'
            }`}
            title={`Repeat mode: ${repeatMode}`}
          >
            {repeatMode === 'one' ? <Repeat1 className="w-5 h-5" /> : <Repeat className="w-5 h-5" />}
          </button>
        </div>

        {/* Bottom features bar: DJ Bass Boost, Lyrics, Volume */}
        <div className="w-full flex items-center justify-between gap-4 mt-6 pt-4 border-t border-slate-800">
          <button
            onClick={onToggleBassBoost}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              isBassBoost
                ? 'bg-gradient-to-r from-red-600 to-amber-600 text-white shadow-lg shadow-red-600/30 ring-2 ring-amber-400'
                : 'bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700'
            }`}
          >
            <Zap className={`w-4 h-4 ${isBassBoost ? 'fill-current' : ''}`} />
            <span>DJ BASS BOOST {isBassBoost ? 'ON' : 'OFF'}</span>
          </button>

          <button
            onClick={() => {
              onClose();
              onOpenLyrics();
            }}
            className="flex items-center gap-2 px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-amber-400 rounded-xl text-xs font-semibold cursor-pointer transition-colors"
          >
            <FileText className="w-4 h-4" />
            <span>Lyrics & Bol</span>
          </button>

          <div className="hidden sm:flex items-center gap-2">
            <Volume2 className="w-4 h-4 text-slate-400" />
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
              className="w-20 h-1 accent-amber-400 bg-slate-800 rounded-lg cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
