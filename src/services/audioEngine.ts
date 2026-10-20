import { AudioProfile } from '../types/music';

class HaryanviAudioEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private bassFilter: GainNode | null = null;
  private bassBiquad: BiquadFilterNode | null = null;
  private analyser: AnalyserNode | null = null;

  private isPlaying = false;
  private isBassBoosted = false;
  private volume = 0.8;
  private currentSongDuration = 180;
  private currentTime = 0;
  private currentProfile: AudioProfile | null = null;

  private timerId: number | null = null;
  private stepCounter = 0;
  private intervalDurationMs = 125; // default 120 bpm 16th note
  private onTimeUpdateCallback: ((time: number) => void) | null = null;
  private onEndedCallback: (() => void) | null = null;
  private playbackRate = 1.0;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();

      this.analyser = this.ctx.createAnalyser();
      this.analyser.fftSize = 128;
      this.analyser.smoothingTimeConstant = 0.8;

      this.bassBiquad = this.ctx.createBiquadFilter();
      this.bassBiquad.type = 'lowshelf';
      this.bassBiquad.frequency.value = 100;
      this.bassBiquad.gain.value = this.isBassBoosted ? 14 : 0;

      this.bassFilter = this.ctx.createGain();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.value = this.volume;

      // Routing: Synth Nodes -> bassBiquad -> masterGain -> analyser -> destination
      this.bassBiquad.connect(this.masterGain);
      this.masterGain.connect(this.analyser);
      this.analyser.connect(this.ctx.destination);
    }

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setBassBoost(enabled: boolean) {
    this.isBassBoosted = enabled;
    if (this.bassBiquad && this.ctx) {
      this.bassBiquad.gain.setTargetAtTime(enabled ? 14 : 0, this.ctx.currentTime, 0.05);
    }
  }

  public getBassBoost(): boolean {
    return this.isBassBoosted;
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(this.volume, this.ctx.currentTime, 0.02);
    }
  }

  public getVolume(): number {
    return this.volume;
  }

  public setPlaybackRate(rate: number) {
    this.playbackRate = rate;
    if (this.currentProfile && this.isPlaying) {
      this.updateSchedulerTempo();
    }
  }

  public getPlaybackRate(): number {
    return this.playbackRate;
  }

  public setTimeCallbacks(
    onTimeUpdate: (time: number) => void,
    onEnded: () => void
  ) {
    this.onTimeUpdateCallback = onTimeUpdate;
    this.onEndedCallback = onEnded;
  }

  public loadSong(profile: AudioProfile, duration: number, startAt: number = 0) {
    this.currentProfile = profile;
    this.currentSongDuration = duration;
    this.currentTime = startAt;
    this.stepCounter = Math.floor((startAt * (profile.bpm / 60) * 4));
    this.updateSchedulerTempo();
  }

  private updateSchedulerTempo() {
    if (!this.currentProfile) return;
    const bpm = this.currentProfile.bpm * this.playbackRate;
    // 16th note duration in ms
    this.intervalDurationMs = (60 / bpm / 4) * 1000;
  }

  public play(profile?: AudioProfile, duration?: number, startAt?: number) {
    this.initContext();
    if (profile && duration) {
      this.loadSong(profile, duration, startAt ?? this.currentTime);
    }
    this.isPlaying = true;
    this.startSequencer();
  }

  public pause() {
    this.isPlaying = false;
    if (this.timerId !== null) {
      window.clearInterval(this.timerId);
      this.timerId = null;
    }
  }

  public seek(seconds: number) {
    this.currentTime = Math.max(0, Math.min(this.currentSongDuration, seconds));
    if (this.currentProfile) {
      this.stepCounter = Math.floor((this.currentTime * (this.currentProfile.bpm / 60) * 4));
    }
    if (this.onTimeUpdateCallback) {
      this.onTimeUpdateCallback(this.currentTime);
    }
  }

  public getCurrentTime(): number {
    return this.currentTime;
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public getVisualizerData(): Uint8Array<ArrayBuffer> {
    if (!this.analyser) {
      return new Uint8Array(64);
    }
    const data = new Uint8Array(this.analyser.frequencyBinCount);
    this.analyser.getByteFrequencyData(data);
    return data;
  }

  private startSequencer() {
    if (this.timerId !== null) {
      window.clearInterval(this.timerId);
    }

    const tick = () => {
      if (!this.isPlaying || !this.currentProfile || !this.ctx) return;

      const step = this.stepCounter % 16;
      this.scheduleStep(step, this.currentProfile);

      // Advance time
      const secondsPerStep = (this.intervalDurationMs / 1000);
      this.currentTime += secondsPerStep;
      this.stepCounter++;

      if (this.onTimeUpdateCallback) {
        this.onTimeUpdateCallback(this.currentTime);
      }

      if (this.currentTime >= this.currentSongDuration) {
        this.pause();
        if (this.onEndedCallback) {
          this.onEndedCallback();
        }
      }
    };

    this.timerId = window.setInterval(tick, this.intervalDurationMs);
  }

  // Synthesis methods for authentic Haryanvi Desi beats
  private scheduleStep(step: number, profile: AudioProfile) {
    if (!this.ctx || !this.bassBiquad) return;
    const now = this.ctx.currentTime;

    const isTrap = profile.rhythmStyle === 'heavy_bass_trap';
    const isRagni = profile.rhythmStyle === 'ragni_harmonium';
    const isBhangra = profile.rhythmStyle === 'wedding_bhangra';

    // 1. Kick / Dholak Bass Thump (Bayan)
    const kickSteps = isTrap ? [0, 6, 8, 14] : isBhangra ? [0, 4, 8, 12] : [0, 4, 8, 10, 14];
    if (kickSteps.includes(step)) {
      this.triggerDholakBayan(now, step === 0 ? 1.0 : 0.75, profile.bassNoteFreq);
    }

    // 2. Dayan / High Slap (Crisp sharp dholak strike)
    const snareSteps = isTrap ? [4, 12] : isRagni ? [4, 12, 14] : [2, 4, 6, 10, 12, 14];
    if (snareSteps.includes(step)) {
      this.triggerDholakDayan(now, step === 4 || step === 12 ? 0.9 : 0.5);
    }

    // 3. Ghungroo / Manjira Shaker (Haryanvi chimta or hi-hat)
    if (step % 2 === 0 || step === 3 || step === 7 || step === 11 || step === 15) {
      this.triggerManjira(now, step % 4 === 2 ? 0.35 : 0.2);
    }

    // 4. Bass synth (Deep 808/Moog Desi glide)
    if (step === 0 || step === 6 || step === 8 || step === 12) {
      this.triggerBassTone(now, profile.bassNoteFreq, 0.25);
    }

    // 5. Melodic hook (Plucked Tumbi / Clarinet / Harmonium synth)
    const patternIdx = step % profile.leadPattern.length;
    const noteScaleIdx = profile.leadPattern[patternIdx];
    if (noteScaleIdx >= 0) {
      const semitone = profile.scale[noteScaleIdx % profile.scale.length];
      const octaves = Math.floor(noteScaleIdx / profile.scale.length);
      const freq = profile.rootFreq * Math.pow(2, (semitone + octaves * 12) / 12);
      this.triggerMelodyNote(now, freq, isRagni ? 'harmonium' : 'tumbi');
    }
  }

  // Dholak Bayan / Bass Drum
  private triggerDholakBayan(time: number, gainMul: number, rootFreq: number) {
    if (!this.ctx || !this.bassBiquad) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    const startFreq = this.isBassBoosted ? 130 : 160;
    const endFreq = Math.max(38, rootFreq / 2);

    osc.type = 'sine';
    osc.frequency.setValueAtTime(startFreq, time);
    osc.frequency.exponentialRampToValueAtTime(endFreq, time + 0.14);

    const peak = (this.isBassBoosted ? 0.9 : 0.6) * gainMul;
    gain.gain.setValueAtTime(peak, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.22);

    osc.connect(gain);
    gain.connect(this.bassBiquad);

    osc.start(time);
    osc.stop(time + 0.23);
  }

  // Dholak Dayan / Slap (Snappy folk slap)
  private triggerDholakDayan(time: number, gainMul: number) {
    if (!this.ctx || !this.bassBiquad) return;

    // Filtered noise for slap snap
    const bufferSize = this.ctx.sampleRate * 0.06;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1400, time);
    filter.Q.setValueAtTime(3, time);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.4 * gainMul, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.07);

    // Add resonant wooden ring
    const osc = this.ctx.createOscillator();
    const oscGain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(620, time);
    osc.frequency.exponentialRampToValueAtTime(340, time + 0.05);

    oscGain.gain.setValueAtTime(0.3 * gainMul, time);
    oscGain.gain.exponentialRampToValueAtTime(0.001, time + 0.06);

    whiteNoise.connect(filter);
    filter.connect(gain);
    gain.connect(this.bassBiquad);

    osc.connect(oscGain);
    oscGain.connect(this.bassBiquad);

    whiteNoise.start(time);
    whiteNoise.stop(time + 0.08);
    osc.start(time);
    osc.stop(time + 0.08);
  }

  // Chimta / Manjira (Metallic shaker)
  private triggerManjira(time: number, gainMul: number) {
    if (!this.ctx || !this.bassBiquad) return;

    const bufferSize = this.ctx.sampleRate * 0.03;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.setValueAtTime(7500, time);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.12 * gainMul, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.035);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.bassBiquad);

    noise.start(time);
    noise.stop(time + 0.04);
  }

  // Bass Synth Line (Punchy bass tone)
  private triggerBassTone(time: number, freq: number, duration: number) {
    if (!this.ctx || !this.bassBiquad) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(freq, time);

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(this.isBassBoosted ? 450 : 320, time);

    const peak = this.isBassBoosted ? 0.45 : 0.28;
    gain.gain.setValueAtTime(peak, time);
    gain.gain.linearRampToValueAtTime(peak * 0.6, time + duration * 0.4);
    gain.gain.exponentialRampToValueAtTime(0.001, time + duration);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.bassBiquad);

    osc.start(time);
    osc.stop(time + duration + 0.01);
  }

  // Melodic Lead Note (Tumbi pluck or harmonium reedy tone)
  private triggerMelodyNote(time: number, freq: number, instrument: 'tumbi' | 'harmonium') {
    if (!this.ctx || !this.bassBiquad) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    if (instrument === 'harmonium') {
      osc.type = 'triangle';
      gain.gain.setValueAtTime(0.18, time);
      gain.gain.linearRampToValueAtTime(0.14, time + 0.12);
      gain.gain.exponentialRampToValueAtTime(0.001, time + 0.24);
    } else {
      // Tumbi / Plucked folk string
      osc.type = 'square';
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(freq * 1.5, time);
      filter.Q.setValueAtTime(4, time);

      gain.gain.setValueAtTime(0.22, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + 0.18);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.bassBiquad);

      osc.frequency.setValueAtTime(freq, time);
      osc.start(time);
      osc.stop(time + 0.2);
      return;
    }

    osc.frequency.setValueAtTime(freq, time);
    osc.connect(gain);
    gain.connect(this.bassBiquad);

    osc.start(time);
    osc.stop(time + 0.25);
  }

  // --- Live Interactive DJ FX Soundboard ---
  public playDJEffect(effect: 'systumm' | 'airhorn' | 'dhol_roll' | 'whistle' | 'bass_drop') {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;

    switch (effect) {
      case 'airhorn': {
        // Classic Reggae / Desi DJ airhorn stabs
        const notes = [587.33, 587.33, 587.33, 659.25, 783.99];
        const times = [0, 0.12, 0.24, 0.38, 0.52];
        notes.forEach((freq, idx) => {
          const osc = this.ctx!.createOscillator();
          const gain = this.ctx!.createGain();
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(freq, now + times[idx]);

          gain.gain.setValueAtTime(0.35, now + times[idx]);
          gain.gain.exponentialRampToValueAtTime(0.001, now + times[idx] + 0.15);

          osc.connect(gain);
          gain.connect(this.masterGain!);
          osc.start(now + times[idx]);
          osc.stop(now + times[idx] + 0.16);
        });
        break;
      }

      case 'systumm': {
        // "SYSTUMM" heavy robotic bass sweep
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(90, now);
        osc.frequency.linearRampToValueAtTime(45, now + 0.4);

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(800, now);
        filter.frequency.exponentialRampToValueAtTime(100, now + 0.45);

        gain.gain.setValueAtTime(0.6, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGain);

        osc.start(now);
        osc.stop(now + 0.52);
        break;
      }

      case 'dhol_roll': {
        // Rapid 8-hit dholak roll
        for (let i = 0; i < 8; i++) {
          const t = now + i * 0.055;
          this.triggerDholakDayan(t, 0.4 + i * 0.06);
          if (i % 2 === 0) {
            this.triggerDholakBayan(t, 0.5 + i * 0.05, 120);
          }
        }
        break;
      }

      case 'whistle': {
        // Desi village mela whistle (seeti)
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(1400, now);
        osc.frequency.linearRampToValueAtTime(2200, now + 0.15);
        osc.frequency.linearRampToValueAtTime(1900, now + 0.35);

        gain.gain.setValueAtTime(0.25, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

        osc.connect(gain);
        gain.connect(this.masterGain);
        osc.start(now);
        osc.stop(now + 0.42);
        break;
      }

      case 'bass_drop': {
        // Huge sub bass tractor drop
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(240, now);
        osc.frequency.exponentialRampToValueAtTime(32, now + 0.8);

        gain.gain.setValueAtTime(0.7, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.9);

        osc.connect(gain);
        gain.connect(this.masterGain);
        osc.start(now);
        osc.stop(now + 0.95);
        break;
      }
    }
  }
}

export const audioEngine = new HaryanviAudioEngine();
