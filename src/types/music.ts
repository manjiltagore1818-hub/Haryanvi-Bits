export type SongCategory = 'dj_blast' | 'desi_swag' | 'folk_ragni' | 'romantic' | 'all_time_hits';

export interface LyricLine {
  time: number; // in seconds
  text: string;
  hindi: string;
  meaning: string;
}

export interface AudioProfile {
  bpm: number;
  rootFreq: number; // base tone (e.g., 220 for A3)
  scale: number[]; // scale semitone intervals e.g. [0, 2, 4, 5, 7, 9, 11] or Bhairav / Bilawal
  rhythmStyle: 'dholak_fast' | 'heavy_bass_trap' | 'ragni_harmonium' | 'wedding_bhangra' | 'acoustic_desi';
  leadPattern: number[]; // melody index pattern
  bassNoteFreq: number;
}

export interface Song {
  id: string;
  title: string;
  hindiTitle: string;
  artist: string;
  starring: string;
  musicDirector: string;
  category: SongCategory;
  year: number;
  duration: number; // in seconds
  plays: string;
  moodTag: string;
  funFact: string;
  coverGradient: {
    from: string;
    via?: string;
    to: string;
    accent: string;
    icon: 'dholak' | 'tractor' | 'dj' | 'hookah' | 'dancer' | 'heart' | 'flute' | 'crown';
  };
  audioProfile: AudioProfile;
  lyrics: LyricLine[];
}

export interface Playlist {
  id: string;
  name: string;
  hindiName: string;
  description: string;
  songIds: string[];
  coverColor: string;
  isCustom?: boolean;
  accent: string;
}

export interface GlossaryItem {
  term: string;
  hindi: string;
  meaning: string;
  exampleSong: string;
  culturalNote: string;
}
