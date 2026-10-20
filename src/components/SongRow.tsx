import React from 'react';
import { Play, Pause, Heart, Plus, FileText, Trash2 } from 'lucide-react';
import { Song } from '../types/music';
import { AlbumArt } from './AlbumArt';

interface SongRowProps {
  song: Song;
  index: number;
  isCurrent: boolean;
  isPlaying: boolean;
  isFavorite: boolean;
  onPlay: (song: Song) => void;
  onToggleFavorite: (songId: string) => void;
  onAddToQueue?: (song: Song) => void;
  onRemoveFromQueue?: (songId: string) => void;
  onOpenLyrics: (song: Song) => void;
}

export const SongRow: React.FC<SongRowProps> = ({
  song,
  index,
  isCurrent,
  isPlaying,
  isFavorite,
  onPlay,
  onToggleFavorite,
  onAddToQueue,
  onRemoveFromQueue,
  onOpenLyrics,
}) => {
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = Math.floor(secs % 60);
    return `${mins}:${remainder < 10 ? '0' : ''}${remainder}`;
  };

  return (
    <div
      onClick={() => onPlay(song)}
      className={`group flex items-center gap-3 sm:gap-4 px-3 sm:px-4 py-2.5 rounded-xl transition-colors cursor-pointer border ${
        isCurrent
          ? 'bg-amber-500/10 border-amber-500/30'
          : 'bg-transparent hover:bg-slate-900/60 border-transparent hover:border-slate-800'
      }`}
    >
      {/* Index or Equalizer / Play button */}
      <div className="w-6 sm:w-8 text-center shrink-0">
        {isCurrent && isPlaying ? (
          <div className="flex items-end justify-center gap-0.5 h-4">
            <span className="w-1 bg-amber-400 rounded-full animate-bounce [animation-duration:500ms]" style={{ height: '60%' }} />
            <span className="w-1 bg-amber-400 rounded-full animate-bounce [animation-duration:350ms]" style={{ height: '100%' }} />
            <span className="w-1 bg-amber-400 rounded-full animate-bounce [animation-duration:700ms]" style={{ height: '40%' }} />
          </div>
        ) : (
          <span className="text-xs font-mono tabular-nums text-slate-500 group-hover:hidden">
            {(index + 1).toString().padStart(2, '0')}
          </span>
        )}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPlay(song);
          }}
          className={`hidden group-hover:inline-flex items-center justify-center text-slate-300 hover:text-amber-400 cursor-pointer ${
            isCurrent && isPlaying ? '!hidden' : ''
          }`}
        >
          <Play className="w-4 h-4 fill-current ml-0.5" />
        </button>
      </div>

      {/* Album cover */}
      <AlbumArt
        gradient={song.coverGradient}
        title={song.title}
        size="sm"
        isPlaying={isCurrent && isPlaying}
      />

      {/* Title & Artist */}
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-semibold truncate ${
          isCurrent ? 'text-amber-400' : 'text-slate-100 group-hover:text-amber-300'
        }`}>
          {song.title}
        </p>
        <div className="flex items-center gap-2 text-xs text-slate-400 truncate mt-0.5">
          <span className="truncate">{song.artist}</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span className="text-slate-500 truncate">{song.hindiTitle}</span>
        </div>
      </div>

      {/* Tag / Category (hidden on mobile) */}
      <div className="hidden md:flex items-center text-xs text-slate-400 w-36 truncate">
        <span>{song.moodTag}</span>
      </div>

      {/* Duration */}
      <div className="text-xs font-mono tabular-nums text-slate-500 shrink-0">
        {formatTime(song.duration)}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1 shrink-0 opacity-80 sm:opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(song.id);
          }}
          className={`p-1.5 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer ${
            isFavorite ? 'text-rose-500' : 'text-slate-400 hover:text-white'
          }`}
          title={isFavorite ? 'Remove Favorite' : 'Favorite'}
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-rose-500' : ''}`} />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onOpenLyrics(song);
          }}
          className="p-1.5 rounded-lg text-slate-400 hover:text-amber-400 hover:bg-slate-800 transition-colors cursor-pointer"
          title="View Lyrics"
        >
          <FileText className="w-4 h-4" />
        </button>

        {onAddToQueue && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToQueue(song);
            }}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer hidden sm:block"
            title="Add to Up Next"
          >
            <Plus className="w-4 h-4" />
          </button>
        )}

        {onRemoveFromQueue && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRemoveFromQueue(song.id);
            }}
            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors cursor-pointer"
            title="Remove from queue"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
