import React, { useState } from 'react';
import { X, BookOpen, Music, Search } from 'lucide-react';
import { HARYANVI_GLOSSARY } from '../data/haryanviSongs';

interface HaryanviGlossaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSongByName?: (songName: string) => void;
}

export const HaryanviGlossaryModal: React.FC<HaryanviGlossaryModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [search, setSearch] = useState('');

  if (!isOpen) return null;

  const filteredGlossary = HARYANVI_GLOSSARY.filter(
    (item) =>
      item.term.toLowerCase().includes(search.toLowerCase()) ||
      item.hindi.includes(search) ||
      item.meaning.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl max-h-[85vh] bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-amber-400" />
              <span>Desi Bol · Haryanvi Slang & Cultural Glossary</span>
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Decode the colorful vocabulary and cultural symbols featured in your favorite Haryanvi tracks.
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search */}
        <div className="my-4 relative">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search words (e.g. Systumm, Daman, Raula, Hukka)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-950/70 border border-slate-800 rounded-xl text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-amber-400"
          />
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto space-y-3 pr-1">
          {filteredGlossary.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-slate-950/50 hover:bg-slate-950/80 border border-slate-800/80 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h4 className="text-base font-bold text-amber-300 font-display">
                    {item.term}
                  </h4>
                  <span className="text-xs text-slate-400 font-sans">
                    ({item.hindi})
                  </span>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-amber-400/90 font-medium">
                  <Music className="w-3 h-3" />
                  <span>{item.exampleSong}</span>
                </div>
              </div>

              <p className="text-sm text-slate-200 mt-2 font-medium">
                {item.meaning}
              </p>

              <div className="mt-2.5 pt-2 border-t border-slate-800/60 text-xs text-slate-400 flex items-start gap-1.5">
                <span className="text-amber-400/80 shrink-0 font-semibold">Cultural Origin:</span>
                <span>{item.culturalNote}</span>
              </div>
            </div>
          ))}

          {filteredGlossary.length === 0 && (
            <div className="text-center py-12 text-slate-400 text-sm">
              No glossary terms found matching "{search}".
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-4 pt-3 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-semibold cursor-pointer transition-colors"
          >
            Close Glossary
          </button>
        </div>
      </div>
    </div>
  );
};
