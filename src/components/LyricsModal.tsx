import React from 'react';
import { X, Play, Clock, Sparkles } from 'lucide-react';
import { Song } from '../types/music';

interface LyricsModalProps {
  song: Song | null;
  currentTime: number;
  isOpen: boolean;
  onClose: () => void;
  onSeek: (seconds: number) => void;
}

export const LyricsModal: React.FC<LyricsModalProps> = ({
  song,
  currentTime,
  isOpen,
  onClose,
  onSeek,
}) => {
  if (!isOpen || !song) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl max-h-[85vh] bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <span>{song.title}</span>
              <span className="text-amber-400 font-normal">· {song.hindiTitle}</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Vocals: {song.artist} · Music: {song.musicDirector}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Fun Fact Callout */}
        <div className="px-6 py-2.5 bg-amber-500/10 border-b border-amber-500/20 flex items-start gap-2.5 text-xs text-amber-200">
          <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <span className="font-semibold text-amber-300">Desi Fact:</span> {song.funFact}
          </p>
        </div>

        {/* Synced Lyrics Body */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
          <div className="text-xs font-semibold text-slate-400 tracking-wider mb-2">
            HARYANVI BOL & ENGLISH MEANING (CLICK TO JUMP)
          </div>

          {song.lyrics.map((line, idx) => {
            const isLineActive =
              currentTime >= line.time &&
              (idx === song.lyrics.length - 1 || currentTime < song.lyrics[idx + 1].time);

            return (
              <div
                key={idx}
                onClick={() => onSeek(line.time)}
                className={`p-4 rounded-2xl transition-all cursor-pointer border ${
                  isLineActive
                    ? 'bg-amber-500/15 border-amber-500/40 shadow-lg scale-[1.01]'
                    : 'bg-slate-950/40 hover:bg-slate-800/60 border-slate-800/80'
                }`}
              >
                <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                  <span className="font-mono tabular-nums flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-500" />
                    {Math.floor(line.time / 60)}:{(line.time % 60).toString().padStart(2, '0')}
                  </span>
                  {isLineActive && (
                    <span className="text-[11px] text-amber-400 font-semibold flex items-center gap-1">
                      <Play className="w-3 h-3 fill-amber-400" /> Now Singing
                    </span>
                  )}
                </div>

                {/* Romanized Haryanvi */}
                <p className={`text-base font-semibold ${isLineActive ? 'text-amber-300' : 'text-slate-100'}`}>
                  {line.text}
                </p>

                {/* Devanagari Hindi Script */}
                <p className="text-sm text-slate-300 mt-1 font-medium font-sans">
                  {line.hindi}
                </p>

                {/* Meaning */}
                <p className="text-xs text-slate-400 mt-2 italic bg-slate-900/60 p-2 rounded-lg border border-slate-800/60">
                  "{line.meaning}"
                </p>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between text-xs text-slate-400">
          <span>Click any line to seek player</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-medium cursor-pointer transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
