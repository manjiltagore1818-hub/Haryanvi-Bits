import React, { useState } from 'react';
import { X, Volume2, Sparkles, Zap, Flame, Radio } from 'lucide-react';
import { audioEngine } from '../services/audioEngine';

interface DJSoundboardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DJSoundboardModal: React.FC<DJSoundboardModalProps> = ({ isOpen, onClose }) => {
  const [activeEffect, setActiveEffect] = useState<string | null>(null);

  if (!isOpen) return null;

  const effects = [
    {
      id: 'systumm',
      name: 'Systumm Sweep',
      hindi: 'सिस्टम स्वैप',
      desc: 'Heavy robotic sub-bass frequency sweep that shakes the room.',
      color: 'from-red-600 to-amber-600',
      icon: Zap,
    },
    {
      id: 'airhorn',
      name: 'Desi DJ Airhorn',
      hindi: 'डीजे हॉर्न',
      desc: 'Iconic dancefloor horn stabs played at wedding baraats.',
      color: 'from-amber-500 to-yellow-600',
      icon: Radio,
    },
    {
      id: 'dhol_roll',
      name: 'Live Dholak Roll',
      hindi: 'ढोलक रोल',
      desc: 'Rapid 8-hit dholak dayan & bayan roll building maximum hype.',
      color: 'from-emerald-600 to-teal-700',
      icon: Flame,
    },
    {
      id: 'whistle',
      name: 'Desi Seeti / Whistle',
      hindi: 'देसी सीटी',
      desc: 'High-pitch rural festival mela whistle that cuts through the crowd.',
      color: 'from-blue-600 to-cyan-600',
      icon: Sparkles,
    },
    {
      id: 'bass_drop',
      name: 'Sub-Bass Drop',
      hindi: 'बास ड्रॉप',
      desc: '32Hz sub-bass tractor blast designed for maximum subwoofer vibration.',
      color: 'from-purple-600 to-indigo-800',
      icon: Volume2,
    },
  ];

  const handleTrigger = (effectId: 'systumm' | 'airhorn' | 'dhol_roll' | 'whistle' | 'bass_drop') => {
    setActiveEffect(effectId);
    audioEngine.playDJEffect(effectId);
    setTimeout(() => {
      setActiveEffect(null);
    }, 450);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-400 fill-amber-400" />
              <span>Desi DJ Soundboard</span>
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Tap buttons to overlay live DJ drops & sound effects over playing songs!
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sound FX Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 my-6">
          {effects.map((item) => {
            const Icon = item.icon;
            const isTriggered = activeEffect === item.id;

            return (
              <button
                key={item.id}
                onClick={() =>
                  handleTrigger(item.id as 'systumm' | 'airhorn' | 'dhol_roll' | 'whistle' | 'bass_drop')
                }
                className={`relative flex items-center gap-3.5 p-4 rounded-2xl border text-left transition-all cursor-pointer shadow-md active:scale-95 ${
                  isTriggered
                    ? 'scale-105 border-amber-400 ring-2 ring-amber-400/50 bg-slate-800'
                    : 'bg-slate-950/60 hover:bg-slate-800/80 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white shrink-0 shadow-lg ${
                    isTriggered ? 'animate-bounce' : ''
                  }`}
                >
                  <Icon className="w-6 h-6" />
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-bold text-white truncate">{item.name}</p>
                    <span className="text-[11px] text-amber-400 font-medium">{item.hindi}</span>
                  </div>
                  <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">{item.desc}</p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Tip */}
        <div className="flex items-center justify-between p-3.5 bg-slate-950/80 rounded-xl border border-slate-800/80 text-xs text-slate-400">
          <span>Pro tip: Tap while song plays to create your own live DJ remix!</span>
          <button
            onClick={onClose}
            className="px-3 py-1 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 rounded-md font-semibold cursor-pointer transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
