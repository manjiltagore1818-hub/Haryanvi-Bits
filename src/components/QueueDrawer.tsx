import React from 'react';
import { X, ListMusic, Trash2, Play } from 'lucide-react';
import { Song } from '../types/music';
import { SongRow } from './SongRow';

interface QueueDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  queue: Song[];
  currentSong: Song | null;
  isPlaying: boolean;
  favorites: string[];
  onPlaySong: (song: Song) => void;
  onRemoveFromQueue: (songId: string) => void;
  onClearQueue: () => void;
  onToggleFavorite: (songId: string) => void;
  onOpenLyrics: (song: Song) => void;
}

export const QueueDrawer: React.FC<QueueDrawerProps> = ({
  isOpen,
  onClose,
  queue,
  currentSong,
  isPlaying,
  favorites,
  onPlaySong,
  onRemoveFromQueue,
  onClearQueue,
  onToggleFavorite,
  onOpenLyrics,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-md h-full bg-slate-900 border-l border-slate-800 flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800 bg-slate-950/70">
          <div className="flex items-center gap-2">
            <ListMusic className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-bold text-white">Up Next Queue</h3>
            <span className="text-xs text-slate-500 font-mono">({queue.length})</span>
          </div>

          <div className="flex items-center gap-2">
            {queue.length > 0 && (
              <button
                onClick={onClearQueue}
                className="text-xs text-slate-400 hover:text-rose-400 flex items-center gap-1 cursor-pointer px-2 py-1 rounded hover:bg-slate-800"
                title="Clear queue"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Current track preview if any */}
        {currentSong && (
          <div className="p-4 bg-amber-500/10 border-b border-amber-500/20">
            <div className="text-[10px] font-bold text-amber-400 tracking-wider mb-2 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              NOW PLAYING
            </div>
            <SongRow
              song={currentSong}
              index={0}
              isCurrent={true}
              isPlaying={isPlaying}
              isFavorite={favorites.includes(currentSong.id)}
              onPlay={onPlaySong}
              onToggleFavorite={onToggleFavorite}
              onOpenLyrics={onOpenLyrics}
            />
          </div>
        )}

        {/* Queue List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-1">
          {queue.length === 0 ? (
            <div className="text-center py-20 px-4 text-slate-500 text-xs">
              <ListMusic className="w-8 h-8 mx-auto mb-2 opacity-40" />
              <p>Your queue is empty.</p>
              <p className="mt-1">Click the + button on any song card to add it to Up Next.</p>
            </div>
          ) : (
            queue.map((song, idx) => (
              <SongRow
                key={`${song.id}-${idx}`}
                song={song}
                index={idx}
                isCurrent={currentSong?.id === song.id}
                isPlaying={isPlaying && currentSong?.id === song.id}
                isFavorite={favorites.includes(song.id)}
                onPlay={onPlaySong}
                onToggleFavorite={onToggleFavorite}
                onRemoveFromQueue={onRemoveFromQueue}
                onOpenLyrics={onOpenLyrics}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};
