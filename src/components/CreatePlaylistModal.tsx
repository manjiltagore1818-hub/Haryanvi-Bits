import React, { useState } from 'react';
import { X, Plus, Music, Check } from 'lucide-react';
import { Song, Playlist } from '../types/music';

interface CreatePlaylistModalProps {
  isOpen: boolean;
  onClose: () => void;
  allSongs: Song[];
  onCreatePlaylist: (playlist: Playlist) => void;
}

export const CreatePlaylistModal: React.FC<CreatePlaylistModalProps> = ({
  isOpen,
  onClose,
  allSongs,
  onCreatePlaylist,
}) => {
  const [name, setName] = useState('');
  const [hindiName, setHindiName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedSongIds, setSelectedSongIds] = useState<string[]>([]);
  const [colorTheme, setColorTheme] = useState('from-amber-500 to-red-600');

  if (!isOpen) return null;

  const colorOptions = [
    { label: 'Amber Flame', val: 'from-amber-500 to-red-600', accent: '#f59e0b' },
    { label: 'Desi Emerald', val: 'from-emerald-500 to-teal-700', accent: '#10b981' },
    { label: 'Royal Violet', val: 'from-violet-600 to-indigo-800', accent: '#8b5cf6' },
    { label: 'Midnight Blue', val: 'from-blue-600 to-slate-900', accent: '#3b82f6' },
    { label: 'Sunset Crimson', val: 'from-rose-600 to-amber-700', accent: '#f43f5e' },
  ];

  const handleToggleSong = (id: string) => {
    setSelectedSongIds((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const selectedColor = colorOptions.find((c) => c.val === colorTheme);

    const newPlaylist: Playlist = {
      id: `custom-pl-${Date.now()}`,
      name: name.trim(),
      hindiName: hindiName.trim() || name.trim(),
      description: description.trim() || 'Custom curated Haryanvi playlist',
      songIds: selectedSongIds,
      coverColor: colorTheme,
      isCustom: true,
      accent: selectedColor?.accent || '#f59e0b',
    };

    onCreatePlaylist(newPlaylist);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg max-h-[90vh] bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-7 shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Plus className="w-5 h-5 text-amber-400" />
            <h3 className="text-lg font-bold text-white">Create Custom Playlist</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center cursor-pointer transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto space-y-4 py-4 pr-1">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Playlist Title *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. My Village Roadtrip Beats"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-amber-400"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Hindi / Devanagari Title (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. मेरी पसंदीद हरियाणवी बीट्स"
              value={hindiName}
              onChange={(e) => setHindiName(e.target.value)}
              className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-amber-400"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Description
            </label>
            <textarea
              rows={2}
              placeholder="Tell what kind of desi vibe this playlist has..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-amber-400 resize-none"
            />
          </div>

          {/* Theme Gradient selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">
              Cover Gradient Theme
            </label>
            <div className="flex items-center gap-2.5">
              {colorOptions.map((opt) => (
                <button
                  key={opt.val}
                  type="button"
                  onClick={() => setColorTheme(opt.val)}
                  className={`w-9 h-9 rounded-xl bg-gradient-to-br ${opt.val} flex items-center justify-center cursor-pointer transition-transform ${
                    colorTheme === opt.val ? 'ring-2 ring-white scale-110' : 'opacity-70 hover:opacity-100'
                  }`}
                  title={opt.label}
                >
                  {colorTheme === opt.val && <Check className="w-4 h-4 text-white" />}
                </button>
              ))}
            </div>
          </div>

          {/* Select Songs */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">
              Select Songs ({selectedSongIds.length} added)
            </label>
            <div className="max-h-48 overflow-y-auto space-y-1.5 p-2 bg-slate-950/60 rounded-xl border border-slate-800">
              {allSongs.map((song) => {
                const isSelected = selectedSongIds.includes(song.id);
                return (
                  <div
                    key={song.id}
                    onClick={() => handleToggleSong(song.id)}
                    className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-colors ${
                      isSelected
                        ? 'bg-amber-500/15 border border-amber-500/30 text-amber-300'
                        : 'hover:bg-slate-800/60 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <Music className="w-3.5 h-3.5 shrink-0 text-slate-400" />
                      <span className="text-xs font-medium truncate">{song.title}</span>
                      <span className="text-[11px] text-slate-500 truncate">({song.artist})</span>
                    </div>
                    <div
                      className={`w-4 h-4 rounded flex items-center justify-center border text-[10px] shrink-0 ${
                        isSelected
                          ? 'bg-amber-400 border-amber-400 text-slate-950'
                          : 'border-slate-700'
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Submit */}
          <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!name.trim()}
              className="px-5 py-2 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-md cursor-pointer disabled:opacity-50 transition-all"
            >
              Create Playlist
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
