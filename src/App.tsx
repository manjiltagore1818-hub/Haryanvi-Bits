import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Flame,
  Search,
  SlidersHorizontal,
  Play,
  Sparkles,
  Zap,
  ListMusic,
  Plus,
  Heart,
  Grid3X3,
  List,
  Disc3,
  User,
  BookOpen,
  Volume2,
  Radio,
  Share2,
} from 'lucide-react';

import { Song, Playlist, SongCategory } from './types/music';
import { HARYANVI_SONGS, CURATED_PLAYLISTS, ARTISTS_LIST } from './data/haryanviSongs';
import { audioEngine } from './services/audioEngine';

import { TopBar } from './components/TopBar';
import { SongCard } from './components/SongCard';
import { SongRow } from './components/SongRow';
import { PlayerBar } from './components/PlayerBar';
import { LyricsModal } from './components/LyricsModal';
import { FullPlayerModal } from './components/FullPlayerModal';
import { QueueDrawer } from './components/QueueDrawer';
import { DJSoundboardModal } from './components/DJSoundboardModal';
import { HaryanviGlossaryModal } from './components/HaryanviGlossaryModal';
import { CreatePlaylistModal } from './components/CreatePlaylistModal';
import { ArtistSpotlight } from './components/ArtistSpotlight';
import { AlbumArt } from './components/AlbumArt';

export default function App() {
  // Navigation & view states
  const [currentTab, setCurrentTab] = useState<'discover' | 'playlists' | 'artists' | 'lyrics' | 'djfx'>('discover');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<SongCategory | 'all' | 'favorites'>('all');
  const [sortBy, setSortBy] = useState<'popular' | 'year' | 'bpm' | 'duration'>('popular');
  const [selectedArtist, setSelectedArtist] = useState<string | null>(null);

  // Playlists state (initialized with curated + local storage for custom)
  const [playlists, setPlaylists] = useState<Playlist[]>(() => {
    try {
      const saved = localStorage.getItem('haryanvi_custom_playlists');
      if (saved) {
        const parsed = JSON.parse(saved);
        return [...CURATED_PLAYLISTS, ...parsed];
      }
    } catch {
      // fallback
    }
    return CURATED_PLAYLISTS;
  });

  const [activePlaylist, setActivePlaylist] = useState<Playlist | null>(null);

  // Favorites state
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('haryanvi_favorites');
      return saved ? JSON.parse(saved) : ['song-1', 'song-2', 'song-3'];
    } catch {
      return ['song-1', 'song-2', 'song-3'];
    }
  });

  // Player state
  const [currentSong, setCurrentSong] = useState<Song | null>(HARYANVI_SONGS[0]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(HARYANVI_SONGS[0]?.duration || 180);
  const [isBassBoost, setIsBassBoost] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.8);
  const [isShuffle, setIsShuffle] = useState<boolean>(false);
  const [repeatMode, setRepeatMode] = useState<'off' | 'all' | 'one'>('off');
  const [playbackRate, setPlaybackRate] = useState<number>(1.0);
  const [queue, setQueue] = useState<Song[]>([]);

  // Modals
  const [isLyricsOpen, setIsLyricsOpen] = useState(false);
  const [lyricsSong, setLyricsSong] = useState<Song | null>(null);
  const [isFullPlayerOpen, setIsFullPlayerOpen] = useState(false);
  const [isQueueOpen, setIsQueueOpen] = useState(false);
  const [isSoundboardOpen, setIsSoundboardOpen] = useState(false);
  const [isGlossaryOpen, setIsGlossaryOpen] = useState(false);
  const [isCreatePlaylistOpen, setIsCreatePlaylistOpen] = useState(false);

  // Persist favorites
  useEffect(() => {
    localStorage.setItem('haryanvi_favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Persist custom playlists
  const handleSavePlaylists = (updatedList: Playlist[]) => {
    setPlaylists(updatedList);
    const customOnly = updatedList.filter((p) => p.isCustom);
    localStorage.setItem('haryanvi_custom_playlists', JSON.stringify(customOnly));
  };

  // Wire Audio Engine callbacks
  useEffect(() => {
    audioEngine.setTimeCallbacks(
      (time) => {
        setCurrentTime(time);
      },
      () => {
        // Track ended
        handleSongEnded();
      }
    );
  }, [currentSong, queue, repeatMode, isShuffle]);

  const handleSongEnded = () => {
    if (repeatMode === 'one' && currentSong) {
      audioEngine.seek(0);
      audioEngine.play(currentSong.audioProfile, currentSong.duration, 0);
      return;
    }

    if (queue.length > 0) {
      const nextSong = queue[0];
      setQueue((prev) => prev.slice(1));
      handlePlaySong(nextSong);
      return;
    }

    if (repeatMode === 'all') {
      handleNext();
    } else {
      setIsPlaying(false);
    }
  };

  // Playback handlers
  const handlePlaySong = (song: Song) => {
    if (currentSong?.id === song.id) {
      if (isPlaying) {
        audioEngine.pause();
        setIsPlaying(false);
      } else {
        audioEngine.play();
        setIsPlaying(true);
      }
      return;
    }

    setCurrentSong(song);
    setDuration(song.duration);
    setCurrentTime(0);
    setIsPlaying(true);
    audioEngine.play(song.audioProfile, song.duration, 0);
  };

  const handlePlayPause = () => {
    if (!currentSong) {
      if (HARYANVI_SONGS.length > 0) {
        handlePlaySong(HARYANVI_SONGS[0]);
      }
      return;
    }

    if (isPlaying) {
      audioEngine.pause();
      setIsPlaying(false);
    } else {
      audioEngine.play(currentSong.audioProfile, currentSong.duration, currentTime);
      setIsPlaying(true);
    }
  };

  const handleSeek = (seconds: number) => {
    setCurrentTime(seconds);
    audioEngine.seek(seconds);
  };

  const handlePrev = () => {
    if (currentTime > 4) {
      handleSeek(0);
      return;
    }

    const currentList = activePlaylist
      ? HARYANVI_SONGS.filter((s) => activePlaylist.songIds.includes(s.id))
      : HARYANVI_SONGS;

    if (!currentSong || currentList.length === 0) return;
    const currentIdx = currentList.findIndex((s) => s.id === currentSong.id);
    const prevIdx = currentIdx <= 0 ? currentList.length - 1 : currentIdx - 1;
    handlePlaySong(currentList[prevIdx]);
  };

  const handleNext = () => {
    if (queue.length > 0) {
      const nextSong = queue[0];
      setQueue((prev) => prev.slice(1));
      handlePlaySong(nextSong);
      return;
    }

    const currentList = activePlaylist
      ? HARYANVI_SONGS.filter((s) => activePlaylist.songIds.includes(s.id))
      : HARYANVI_SONGS;

    if (!currentSong || currentList.length === 0) return;

    if (isShuffle) {
      const randomIdx = Math.floor(Math.random() * currentList.length);
      handlePlaySong(currentList[randomIdx]);
      return;
    }

    const currentIdx = currentList.findIndex((s) => s.id === currentSong.id);
    const nextIdx = (currentIdx + 1) % currentList.length;
    handlePlaySong(currentList[nextIdx]);
  };

  const handleToggleBassBoost = () => {
    const nextVal = !isBassBoost;
    setIsBassBoost(nextVal);
    audioEngine.setBassBoost(nextVal);
  };

  const handleVolumeChange = (vol: number) => {
    setVolume(vol);
    audioEngine.setVolume(vol);
  };

  const handleToggleShuffle = () => {
    setIsShuffle((prev) => !prev);
  };

  const handleCycleRepeat = () => {
    setRepeatMode((prev) => (prev === 'off' ? 'all' : prev === 'all' ? 'one' : 'off'));
  };

  const handleCycleRate = () => {
    const nextRate = playbackRate === 1.0 ? 1.25 : playbackRate === 1.25 ? 0.8 : 1.0;
    setPlaybackRate(nextRate);
    audioEngine.setPlaybackRate(nextRate);
  };

  const handleToggleFavorite = (songId: string) => {
    setFavorites((prev) =>
      prev.includes(songId) ? prev.filter((id) => id !== songId) : [...prev, songId]
    );
  };

  const handleAddToQueue = (song: Song) => {
    setQueue((prev) => [...prev, song]);
  };

  const handleRemoveFromQueue = (songId: string) => {
    setQueue((prev) => prev.filter((s) => s.id !== songId));
  };

  const handleClearQueue = () => {
    setQueue([]);
  };

  const handleOpenLyricsForSong = (song: Song) => {
    setLyricsSong(song);
    setIsLyricsOpen(true);
  };

  const handleRandomMix = () => {
    const randomSong = HARYANVI_SONGS[Math.floor(Math.random() * HARYANVI_SONGS.length)];
    handlePlaySong(randomSong);
    setCurrentTab('discover');
    setActivePlaylist(null);
  };

  const handlePlayPlaylistAll = (playlist: Playlist, shuffle: boolean = false) => {
    setActivePlaylist(playlist);
    const playlistSongs = HARYANVI_SONGS.filter((s) => playlist.songIds.includes(s.id));
    if (playlistSongs.length === 0) return;

    if (shuffle) {
      const shuffled = [...playlistSongs].sort(() => Math.random() - 0.5);
      handlePlaySong(shuffled[0]);
      setQueue(shuffled.slice(1));
    } else {
      handlePlaySong(playlistSongs[0]);
      setQueue(playlistSongs.slice(1));
    }
  };

  // Filtered & Sorted Songs
  const displayedSongs = useMemo(() => {
    let result = [...HARYANVI_SONGS];

    // Filter by active playlist if in playlist detail mode
    if (activePlaylist) {
      result = result.filter((s) => activePlaylist.songIds.includes(s.id));
    }

    // Filter by category if on discover
    if (!activePlaylist) {
      if (selectedCategory === 'favorites') {
        result = result.filter((s) => favorites.includes(s.id));
      } else if (selectedCategory !== 'all') {
        result = result.filter((s) => s.category === selectedCategory);
      }
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (s) =>
          s.title.toLowerCase().includes(q) ||
          s.hindiTitle.includes(q) ||
          s.artist.toLowerCase().includes(q) ||
          s.starring.toLowerCase().includes(q) ||
          s.moodTag.toLowerCase().includes(q)
      );
    }

    // Sort
    result.sort((a, b) => {
      if (sortBy === 'year') return b.year - a.year;
      if (sortBy === 'bpm') return b.audioProfile.bpm - a.audioProfile.bpm;
      if (sortBy === 'duration') return b.duration - a.duration;
      return 0; // default order is chart order
    });

    return result;
  }, [activePlaylist, selectedCategory, searchQuery, sortBy, favorites]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col pb-28 selection:bg-amber-500 selection:text-slate-950">
      {/* Strict 3-zone Top Navigation Bar */}
      <TopBar
        currentTab={currentTab}
        onSelectTab={(tab) => {
          if (tab === 'lyrics') {
            setIsGlossaryOpen(true);
            return;
          }
          if (tab === 'djfx') {
            setIsSoundboardOpen(true);
            return;
          }
          setCurrentTab(tab);
          setActivePlaylist(null);
        }}
        onRandomMix={handleRandomMix}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8">
        {/* ========================================================================= */}
        {/* 1. DISCOVER TAB                                                          */}
        {/* ========================================================================= */}
        {currentTab === 'discover' && !activePlaylist && (
          <>
            {/* Hero Banner Section */}
            <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-600 via-red-600 to-purple-900 border border-amber-500/30 p-6 sm:p-10 shadow-2xl">
              {/* Background radial highlight */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-400/20 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 max-w-2xl">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-200 mb-2">
                  <Flame className="w-4 h-4 fill-amber-300 text-amber-300" />
                  <span>TRENDING HARYANVI ANTHEMS 2026</span>
                </div>

                <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight font-display text-balance">
                  52 Gaj Ka Daman, Systumm & Desi Beats
                </h1>

                <p className="mt-3 text-sm sm:text-base text-amber-100/90 leading-relaxed">
                  Stream high-energy dholak rhythms, raw tractor-shaking bass drops, and soulful folk ragni. Complete with line-by-line lyrics and authentic DJ effects.
                </p>

                {/* Primary Action Buttons */}
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => handlePlaySong(HARYANVI_SONGS[0])}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-slate-100 text-slate-950 font-extrabold text-sm rounded-xl shadow-lg shadow-black/30 hover:scale-105 active:scale-95 transition-all cursor-pointer"
                  >
                    <Play className="w-4 h-4 fill-current ml-0.5" />
                    <span>Play Chartbusters</span>
                  </button>

                  <button
                    onClick={handleToggleBassBoost}
                    className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm shadow-md transition-all cursor-pointer ${
                      isBassBoost
                        ? 'bg-amber-400 text-slate-950 ring-2 ring-white shadow-amber-500/30'
                        : 'bg-black/40 hover:bg-black/60 text-white border border-white/20'
                    }`}
                  >
                    <Zap className={`w-4 h-4 ${isBassBoost ? 'fill-current' : ''}`} />
                    <span>DJ Bass Boost {isBassBoost ? 'ON' : 'OFF'}</span>
                  </button>

                  <button
                    onClick={() => setIsSoundboardOpen(true)}
                    className="inline-flex items-center gap-2 px-4 py-3 bg-black/40 hover:bg-black/60 text-white border border-white/20 rounded-xl font-medium text-xs cursor-pointer transition-colors"
                  >
                    <Radio className="w-4 h-4 text-amber-300" />
                    <span>Live DJ FX</span>
                  </button>
                </div>
              </div>

              {/* Editorial Proof strip (Zero-pill discipline, unboxed stats) */}
              <div className="relative z-10 mt-8 pt-6 border-t border-white/20 grid grid-cols-2 sm:grid-cols-4 gap-4 text-white">
                <div>
                  <p className="text-xl sm:text-2xl font-extrabold font-mono tabular-nums">1.6B+</p>
                  <p className="text-xs text-amber-200">Record YouTube Views</p>
                </div>
                <div>
                  <p className="text-xl sm:text-2xl font-extrabold font-mono tabular-nums">16 Tracks</p>
                  <p className="text-xs text-amber-200">Curated Evergreen Hits</p>
                </div>
                <div>
                  <p className="text-xl sm:text-2xl font-extrabold font-mono tabular-nums">80Hz Sub</p>
                  <p className="text-xs text-amber-200">Biquad Bass Engine</p>
                </div>
                <div>
                  <p className="text-xl sm:text-2xl font-extrabold font-mono tabular-nums">100% Desi</p>
                  <p className="text-xs text-amber-200">Haryana Heritage</p>
                </div>
              </div>
            </section>

            {/* Quick Playlists Carousel Banner */}
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-white flex items-center gap-2 font-display">
                    <span>Curated Vibe Playlists</span>
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Specially mixed for wedding baraats, tractors, gyms, and peaceful hookah sessions.
                  </p>
                </div>
                <button
                  onClick={() => setCurrentTab('playlists')}
                  className="text-xs font-semibold text-amber-400 hover:text-amber-300 cursor-pointer"
                >
                  View All ({playlists.length})
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {playlists.slice(0, 3).map((pl) => (
                  <div
                    key={pl.id}
                    onClick={() => setActivePlaylist(pl)}
                    className="group relative overflow-hidden p-5 rounded-2xl bg-slate-900/70 hover:bg-slate-850 border border-slate-800 hover:border-slate-700 transition-all cursor-pointer shadow-md hover:shadow-xl hover:-translate-y-0.5"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span className="text-[11px] font-bold text-amber-400 tracking-wider">
                          {pl.hindiName}
                        </span>
                        <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors mt-0.5 font-display">
                          {pl.name}
                        </h3>
                        <p className="text-xs text-slate-400 line-clamp-2 mt-1">
                          {pl.description}
                        </p>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePlayPlaylistAll(pl);
                        }}
                        className="w-10 h-10 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center shrink-0 shadow-md group-hover:scale-110 active:scale-95 transition-transform cursor-pointer"
                        title="Play Playlist"
                      >
                        <Play className="w-4 h-4 fill-current ml-0.5" />
                      </button>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500">
                      <span>{pl.songIds.length} tracks</span>
                      <span className="text-amber-400 font-medium group-hover:underline">Explore Songs →</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Filter and Search Bar Section */}
            <section className="space-y-4 pt-2">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                {/* Search Bar */}
                <div className="relative flex-1 max-w-md">
                  <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search song, singer (Renuka, Masoom, Raju...), or mood..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-500 hover:text-white cursor-pointer"
                    >
                      Clear
                    </button>
                  )}
                </div>

                {/* View Mode & Sort Dropdown */}
                <div className="flex items-center gap-3 shrink-0">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <SlidersHorizontal className="w-3.5 h-3.5" />
                    <span>Sort:</span>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as any)}
                      className="bg-slate-900 border border-slate-800 text-slate-200 text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-amber-400 cursor-pointer"
                    >
                      <option value="popular">Popularity</option>
                      <option value="year">Newest First</option>
                      <option value="bpm">Fastest BPM</option>
                      <option value="duration">Longest Track</option>
                    </select>
                  </div>

                  {/* Grid vs List toggle */}
                  <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg p-0.5">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                        viewMode === 'grid' ? 'bg-amber-400 text-slate-950' : 'text-slate-400 hover:text-white'
                      }`}
                      title="Grid View"
                    >
                      <Grid3X3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                        viewMode === 'list' ? 'bg-amber-400 text-slate-950' : 'text-slate-400 hover:text-white'
                      }`}
                      title="List View"
                    >
                      <List className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Segmented Filter Control for Categories */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                {[
                  { id: 'all', label: 'All Hits' },
                  { id: 'dj_blast', label: '🔥 DJ Blast' },
                  { id: 'desi_swag', label: '👑 Desi Swag' },
                  { id: 'all_time_hits', label: '⭐ Golden Classics' },
                  { id: 'folk_ragni', label: '🌾 Folk & Ragni' },
                  { id: 'romantic', label: '❤️ Romantic' },
                  { id: 'favorites', label: `❤️ Favorites (${favorites.length})` },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id as any)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                      selectedCategory === cat.id
                        ? 'bg-amber-400 text-slate-950 shadow-sm shadow-amber-500/20'
                        : 'bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </section>

            {/* Song Grid or List */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold tracking-wider text-slate-400 uppercase">
                  {selectedCategory === 'favorites' ? 'Your Favorite Haryanvi Songs' : 'Popular Songs'}
                  <span className="ml-2 font-mono tabular-nums text-xs font-normal text-slate-500">
                    ({displayedSongs.length} tracks)
                  </span>
                </h3>
              </div>

              {displayedSongs.length === 0 ? (
                <div className="text-center py-16 bg-slate-900/40 rounded-3xl border border-slate-800/80">
                  <Disc3 className="w-10 h-10 mx-auto text-slate-600 mb-2" />
                  <p className="text-sm font-medium text-slate-300">No songs match your criteria</p>
                  <p className="text-xs text-slate-500 mt-1">Try resetting search or category filters</p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('all');
                    }}
                    className="mt-3 px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-amber-400 rounded-lg cursor-pointer"
                  >
                    Reset Filters
                  </button>
                </div>
              ) : viewMode === 'grid' ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {displayedSongs.map((song) => (
                    <SongCard
                      key={song.id}
                      song={song}
                      isCurrent={currentSong?.id === song.id}
                      isPlaying={isPlaying && currentSong?.id === song.id}
                      isFavorite={favorites.includes(song.id)}
                      onPlay={handlePlaySong}
                      onToggleFavorite={handleToggleFavorite}
                      onAddToQueue={handleAddToQueue}
                      onOpenLyrics={handleOpenLyricsForSong}
                    />
                  ))}
                </div>
              ) : (
                <div className="space-y-1.5 bg-slate-900/40 p-2 sm:p-3 rounded-2xl border border-slate-800/80">
                  {displayedSongs.map((song, idx) => (
                    <SongRow
                      key={song.id}
                      song={song}
                      index={idx}
                      isCurrent={currentSong?.id === song.id}
                      isPlaying={isPlaying && currentSong?.id === song.id}
                      isFavorite={favorites.includes(song.id)}
                      onPlay={handlePlaySong}
                      onToggleFavorite={handleToggleFavorite}
                      onAddToQueue={handleAddToQueue}
                      onOpenLyrics={handleOpenLyricsForSong}
                    />
                  ))}
                </div>
              )}
            </section>
          </>
        )}

        {/* ========================================================================= */}
        {/* 2. PLAYLIST DETAIL VIEW (when a playlist is active)                     */}
        {/* ========================================================================= */}
        {activePlaylist && (
          <section className="space-y-6 animate-in fade-in duration-200">
            {/* Playlist Header */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800 flex flex-col md:flex-row md:items-end justify-between gap-6 shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                <div
                  className={`w-32 h-32 sm:w-40 sm:h-40 rounded-2xl bg-gradient-to-br ${activePlaylist.coverColor} flex items-center justify-center text-white shadow-2xl shrink-0`}
                >
                  <ListMusic className="w-16 h-16 opacity-90" />
                </div>

                <div>
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-400 tracking-wider">
                    <span>PLAYLIST</span>
                    <span>·</span>
                    <span>{activePlaylist.hindiName}</span>
                  </div>

                  <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-1 font-display">
                    {activePlaylist.name}
                  </h2>

                  <p className="text-sm text-slate-300 mt-2 max-w-xl leading-relaxed">
                    {activePlaylist.description}
                  </p>

                  <div className="flex items-center gap-2 text-xs text-slate-400 mt-3 font-mono tabular-nums">
                    <span>{activePlaylist.songIds.length} Songs</span>
                    <span>·</span>
                    <span>
                      Approx.{' '}
                      {Math.round(
                        HARYANVI_SONGS.filter((s) => activePlaylist.songIds.includes(s.id)).reduce(
                          (acc, cur) => acc + cur.duration,
                          0
                        ) / 60
                      )}{' '}
                      minutes
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 shrink-0">
                <button
                  onClick={() => handlePlayPlaylistAll(activePlaylist, false)}
                  className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-amber-500/20 flex items-center gap-2 cursor-pointer active:scale-95 transition-all"
                >
                  <Play className="w-4 h-4 fill-current ml-0.5" />
                  <span>Play All</span>
                </button>

                <button
                  onClick={() => handlePlayPlaylistAll(activePlaylist, true)}
                  className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs rounded-xl flex items-center gap-2 cursor-pointer transition-colors"
                >
                  <span>Shuffle</span>
                </button>

                <button
                  onClick={() => setActivePlaylist(null)}
                  className="px-4 py-2.5 text-xs text-slate-400 hover:text-white cursor-pointer"
                >
                  Back to List
                </button>
              </div>
            </div>

            {/* Song rows in this playlist */}
            <div className="space-y-1 bg-slate-900/40 p-2 sm:p-3 rounded-2xl border border-slate-800/80">
              {displayedSongs.map((song, idx) => (
                <SongRow
                  key={song.id}
                  song={song}
                  index={idx}
                  isCurrent={currentSong?.id === song.id}
                  isPlaying={isPlaying && currentSong?.id === song.id}
                  isFavorite={favorites.includes(song.id)}
                  onPlay={handlePlaySong}
                  onToggleFavorite={handleToggleFavorite}
                  onAddToQueue={handleAddToQueue}
                  onOpenLyrics={handleOpenLyricsForSong}
                />
              ))}
            </div>
          </section>
        )}

        {/* ========================================================================= */}
        {/* 3. PLAYLISTS TAB (All Playlists Overview)                                  */}
        {/* ========================================================================= */}
        {currentTab === 'playlists' && !activePlaylist && (
          <section className="space-y-6 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-white font-display">Haryanvi Playlists</h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Explore curated DJ anthems, folk classics, or create your own custom mixes.
                </p>
              </div>

              <button
                onClick={() => setIsCreatePlaylistOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-md cursor-pointer active:scale-95 transition-all self-start sm:self-auto"
              >
                <Plus className="w-4 h-4" />
                <span>Create New Playlist</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {playlists.map((pl) => (
                <div
                  key={pl.id}
                  onClick={() => setActivePlaylist(pl)}
                  className="group relative p-5 rounded-2xl bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 hover:border-slate-700 transition-all cursor-pointer shadow-md hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between"
                >
                  <div>
                    <div
                      className={`w-full h-32 rounded-xl bg-gradient-to-br ${pl.coverColor} flex items-center justify-center text-white mb-4 shadow-inner relative overflow-hidden`}
                    >
                      <ListMusic className="w-12 h-12 opacity-80" />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePlayPlaylistAll(pl);
                        }}
                        className="absolute bottom-3 right-3 w-11 h-11 rounded-full bg-amber-400 hover:bg-amber-300 text-slate-950 flex items-center justify-center shadow-lg transform transition-transform group-hover:scale-105 active:scale-95 cursor-pointer"
                        title="Play"
                      >
                        <Play className="w-5 h-5 fill-current ml-0.5" />
                      </button>
                    </div>

                    <div className="text-[11px] font-bold text-amber-400 tracking-wider">
                      {pl.hindiName}
                    </div>

                    <h3 className="text-lg font-bold text-white group-hover:text-amber-300 font-display mt-0.5">
                      {pl.name}
                    </h3>

                    <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                      {pl.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-500 font-mono">
                    <span>{pl.songIds.length} tracks</span>
                    <span className="text-amber-400 font-sans font-medium text-[11px]">View Tracklist →</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ========================================================================= */}
        {/* 4. ARTISTS TAB                                                           */}
        {/* ========================================================================= */}
        {currentTab === 'artists' && (
          <section className="animate-in fade-in duration-200">
            <ArtistSpotlight
              selectedArtist={selectedArtist}
              onSelectArtist={(artist) => setSelectedArtist(artist)}
              songs={HARYANVI_SONGS}
              currentSong={currentSong}
              isPlaying={isPlaying}
              favorites={favorites}
              onPlaySong={handlePlaySong}
              onPlayArtistAll={(artistSongs) => {
                if (artistSongs.length > 0) {
                  handlePlaySong(artistSongs[0]);
                  setQueue(artistSongs.slice(1));
                }
              }}
              onToggleFavorite={handleToggleFavorite}
              onAddToQueue={handleAddToQueue}
              onOpenLyrics={handleOpenLyricsForSong}
            />
          </section>
        )}
      </main>

      {/* Docked Sticky Player Bar */}
      <PlayerBar
        currentSong={currentSong}
        isPlaying={isPlaying}
        currentTime={currentTime}
        duration={duration}
        isBassBoost={isBassBoost}
        volume={volume}
        isShuffle={isShuffle}
        repeatMode={repeatMode}
        playbackRate={playbackRate}
        isFavorite={currentSong ? favorites.includes(currentSong.id) : false}
        onPlayPause={handlePlayPause}
        onPrev={handlePrev}
        onNext={handleNext}
        onSeek={handleSeek}
        onToggleBassBoost={handleToggleBassBoost}
        onVolumeChange={handleVolumeChange}
        onToggleShuffle={handleToggleShuffle}
        onCycleRepeat={handleCycleRepeat}
        onCycleRate={handleCycleRate}
        onToggleFavorite={() => currentSong && handleToggleFavorite(currentSong.id)}
        onOpenLyrics={() => {
          if (currentSong) handleOpenLyricsForSong(currentSong);
        }}
        onOpenQueue={() => setIsQueueOpen(true)}
        onOpenFullPlayer={() => setIsFullPlayerOpen(true)}
      />

      {/* Interactive Modals */}
      <LyricsModal
        song={lyricsSong || currentSong}
        currentTime={currentTime}
        isOpen={isLyricsOpen}
        onClose={() => setIsLyricsOpen(false)}
        onSeek={handleSeek}
      />

      <FullPlayerModal
        song={currentSong}
        isPlaying={isPlaying}
        currentTime={currentTime}
        duration={duration}
        isBassBoost={isBassBoost}
        volume={volume}
        isShuffle={isShuffle}
        repeatMode={repeatMode}
        isFavorite={currentSong ? favorites.includes(currentSong.id) : false}
        onClose={() => setIsFullPlayerOpen(false)}
        onPlayPause={handlePlayPause}
        onPrev={handlePrev}
        onNext={handleNext}
        onSeek={handleSeek}
        onToggleBassBoost={handleToggleBassBoost}
        onVolumeChange={handleVolumeChange}
        onToggleShuffle={handleToggleShuffle}
        onCycleRepeat={handleCycleRepeat}
        onToggleFavorite={() => currentSong && handleToggleFavorite(currentSong.id)}
        onOpenLyrics={() => {
          if (currentSong) handleOpenLyricsForSong(currentSong);
        }}
      />

      <QueueDrawer
        isOpen={isQueueOpen}
        onClose={() => setIsQueueOpen(false)}
        queue={queue}
        currentSong={currentSong}
        isPlaying={isPlaying}
        favorites={favorites}
        onPlaySong={handlePlaySong}
        onRemoveFromQueue={handleRemoveFromQueue}
        onClearQueue={handleClearQueue}
        onToggleFavorite={handleToggleFavorite}
        onOpenLyrics={handleOpenLyricsForSong}
      />

      <DJSoundboardModal
        isOpen={isSoundboardOpen}
        onClose={() => setIsSoundboardOpen(false)}
      />

      <HaryanviGlossaryModal
        isOpen={isGlossaryOpen}
        onClose={() => setIsGlossaryOpen(false)}
      />

      <CreatePlaylistModal
        isOpen={isCreatePlaylistOpen}
        onClose={() => setIsCreatePlaylistOpen(false)}
        allSongs={HARYANVI_SONGS}
        onCreatePlaylist={(newPl) => {
          handleSavePlaylists([...playlists, newPl]);
          setActivePlaylist(newPl);
          setCurrentTab('playlists');
        }}
      />
    </div>
  );
}
