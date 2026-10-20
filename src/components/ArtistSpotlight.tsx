import React from 'react';
import { User, Play, Sparkles } from 'lucide-react';
import { Song } from '../types/music';
import { ARTISTS_LIST } from '../data/haryanviSongs';
import { SongRow } from './SongRow';

interface ArtistSpotlightProps {
  selectedArtist: string | null;
  onSelectArtist: (artist: string | null) => void;
  songs: Song[];
  currentSong: Song | null;
  isPlaying: boolean;
  favorites: string[];
  onPlaySong: (song: Song) => void;
  onPlayArtistAll: (artistSongs: Song[]) => void;
  onToggleFavorite: (songId: string) => void;
  onAddToQueue: (song: Song) => void;
  onOpenLyrics: (song: Song) => void;
}

export const ArtistSpotlight: React.FC<ArtistSpotlightProps> = ({
  selectedArtist,
  onSelectArtist,
  songs,
  currentSong,
  isPlaying,
  favorites,
  onPlaySong,
  onPlayArtistAll,
  onToggleFavorite,
  onAddToQueue,
  onOpenLyrics,
}) => {
  const activeArtistInfo = ARTISTS_LIST.find((a) => a.name === selectedArtist);
  const artistSongs = selectedArtist
    ? songs.filter((s) => s.artist.toLowerCase().includes(selectedArtist.toLowerCase()))
    : [];

  return (
    <div className="space-y-6">
      {/* Artist Horizontal Selector Pills/Buttons */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-slate-300 tracking-wider flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>FEATURED HARYANVI ARTISTS</span>
          </h3>
          {selectedArtist && (
            <button
              onClick={() => onSelectArtist(null)}
              className="text-xs text-amber-400 hover:text-amber-300 cursor-pointer"
            >
              Show All Artists
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
          {ARTISTS_LIST.map((artist) => {
            const isSelected = selectedArtist === artist.name;
            return (
              <button
                key={artist.name}
                onClick={() => onSelectArtist(isSelected ? null : artist.name)}
                className={`p-3 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 shadow-sm active:scale-95 ${
                  isSelected
                    ? 'bg-amber-500/20 border-amber-400 text-white ring-2 ring-amber-400/40 shadow-amber-500/10'
                    : 'bg-slate-900/60 hover:bg-slate-800/80 border-slate-800 text-slate-300'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-transform ${
                    isSelected
                      ? 'bg-amber-400 text-slate-950 scale-105'
                      : 'bg-slate-800 text-slate-400 group-hover:text-amber-400'
                  }`}
                >
                  <User className="w-5 h-5" />
                </div>
                <div className="min-w-0 w-full">
                  <p className="text-xs font-bold truncate">{artist.name}</p>
                  <p className="text-[10px] text-slate-500 truncate">{artist.count} tracks</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Artist Detail Banner & Tracklist */}
      {selectedArtist && activeArtistInfo && (
        <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800 animate-in fade-in duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-800">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500 to-red-600 flex items-center justify-center text-slate-950 font-bold text-xl shadow-lg shadow-amber-500/20">
                {selectedArtist.charAt(0)}
              </div>
              <div>
                <h4 className="text-xl sm:text-2xl font-bold text-white font-display">
                  {selectedArtist}
                </h4>
                <p className="text-xs text-amber-400 font-medium mt-0.5">
                  {activeArtistInfo.title}
                </p>
                <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                  <span>{artistSongs.length} Tracks in Catalog</span>
                  <span>·</span>
                  <span>All-Time Haryanvi Chartbuster</span>
                </div>
              </div>
            </div>

            {artistSongs.length > 0 && (
              <button
                onClick={() => onPlayArtistAll(artistSongs)}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-xl shadow-md shadow-amber-500/20 cursor-pointer active:scale-95 transition-all"
              >
                <Play className="w-4 h-4 fill-current ml-0.5" />
                <span>Play All ({artistSongs.length})</span>
              </button>
            )}
          </div>

          {/* Songs list */}
          <div className="mt-4 space-y-1">
            {artistSongs.map((song, idx) => (
              <SongRow
                key={song.id}
                song={song}
                index={idx}
                isCurrent={currentSong?.id === song.id}
                isPlaying={isPlaying && currentSong?.id === song.id}
                isFavorite={favorites.includes(song.id)}
                onPlay={onPlaySong}
                onToggleFavorite={onToggleFavorite}
                onAddToQueue={onAddToQueue}
                onOpenLyrics={onOpenLyrics}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
