import React from 'react';
import { Play, Pause, Heart, Plus, FileText } from 'lucide-react';
import { Song } from '../types/music';
import { AlbumArt } from './AlbumArt';

interface SongCardProps {
  song: Song;
  isCurrent: boolean;
  isPlaying: boolean;
  isFavorite: boolean;
  onPlay: (song: Song) => void;
  onToggleFavorite: (songId: string) => void;
  onAddToQueue: (song: Song) => void;
  onOpenLyrics: (song: Song) => void;
}

export const SongCard: React.FC<SongCardProps> = ({
  song,
  isCurrent,
  isPlaying,
  isFavorite,
  onPlay,
  onToggleFavorite,
  onAddToQueue,
  onOpenLyrics,
}) => {
  return (
    <div
      onClick={() => onPlay(song)}
      className="group relative flex flex-col p-3.5 rounded-2xl bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800/80 hover:border-slate-700 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-xl hover:-translate-y-1"
    >
      {/* Cover container */}
      <div className="relative w-full aspect-square rounded-xl overflow-hidden mb-3">
        <AlbumArt
          gradient={song.coverGradient}
          title={song.title}
          size="lg"
          isPlaying={isCurrent && isPlaying}
        />

        {/* Hover play button overlay */}
        <div className={`absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center transition-opacity duration-200 ${
          isCurrent ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
        }`}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPlay(song);
            }}
            className="w-12 h-12 rounded-full bg-amber-400 hover:bg-amber-300 text-slate-950 flex items-center justify-center shadow-lg shadow-amber-500/30 transform transition-transform group-hover:scale-105 active:scale-95 cursor-pointer"
            title={isCurrent && isPlaying ? 'Pause' : 'Play'}
          >
            {isCurrent && isPlaying ? (
              <Pause className="w-5 h-5 fill-current" />
            ) : (
              <Play className="w-5 h-5 fill-current ml-0.5" />
            )}
          </button>
        </div>

        {/* Top-right quick actions */}
        <div className="absolute top-2 right-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(song.id);
            }}
            className="w-8 h-8 rounded-full bg-slate-950/70 hover:bg-slate-900 text-white flex items-center justify-center cursor-pointer transition-colors backdrop-blur-xs"
            title={isFavorite ? 'Remove Favorite' : 'Favorite'}
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-rose-500 text-rose-500' : 'text-slate-300'}`} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToQueue(song);
            }}
            className="w-8 h-8 rounded-full bg-slate-950/70 hover:bg-slate-900 text-slate-300 hover:text-white flex items-center justify-center cursor-pointer transition-colors backdrop-blur-xs"
            title="Add to Up Next queue"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Song details */}
      <div className="flex-1 min-w-0">
        <h4 className={`text-sm font-semibold truncate ${
          isCurrent ? 'text-amber-400' : 'text-white group-hover:text-amber-300'
        }`}>
          {song.title}
        </h4>
        <p className="text-xs text-slate-400 truncate mt-0.5 font-medium">
          {song.hindiTitle}
        </p>

        {/* Unboxed Metadata with · separator */}
        <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mt-2 truncate">
          <span className="text-slate-400 truncate">{song.artist}</span>
          <span aria-hidden="true">·</span>
          <span>{song.year}</span>
          <span aria-hidden="true">·</span>
          <span className="font-mono tabular-nums">{song.plays}</span>
        </div>
      </div>

      {/* Bottom quick lyrics affordance */}
      <div className="mt-2.5 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
        <span className="truncate">{song.moodTag}</span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onOpenLyrics(song);
          }}
          className="hover:text-amber-400 cursor-pointer flex items-center gap-1 shrink-0"
          title="View lyrics"
        >
          <FileText className="w-3 h-3" />
          <span>Lyrics</span>
        </button>
      </div>
    </div>
  );
};
