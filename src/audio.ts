// Web Audio synthesizer creating the iconic instrumental beat of The Weeknd - Starboy
// (No vocals, pure instrumental synth-pop beat with punchy drums, driving bassline & synth stabs)

class StarboyBeatPlayer {
  private audio: HTMLAudioElement | null = null;
  private audioCtx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private isSynthesizing: boolean = false;
  private timerId: number | null = null;
  private masterGain: GainNode | null = null;
  private currentFilePath: string = '/music.mp3';
  private currentStep: number = 0;
  private stepIntervalMs: number = 161.3; // 93 BPM -> 16th notes = (60 / 93) / 4 * 1000 ≈ 161.3ms

  constructor(filePath: string = '/music.mp3') {
    this.currentFilePath = filePath;
  }

  public async togglePlay(): Promise<boolean> {
    if (this.isPlaying) {
      this.pause();
      return false;
    } else {
      return await this.play();
    }
  }

  public async play(): Promise<boolean> {
    // 1. Attempt to play physical audio file if it exists and works
    try {
      if (!this.audio) {
        this.audio = new Audio(this.currentFilePath);
        this.audio.loop = true;
        this.audio.volume = 0.7;
      }
      await this.audio.play();
      this.isPlaying = true;
      this.isSynthesizing = false;
      return true;
    } catch {
      // 2. Fall back to high-energy authentic Starboy instrumental synth beat
      this.startStarboyBeat();
      this.isPlaying = true;
      return true;
    }
  }

  public pause(): void {
    if (this.audio) {
      this.audio.pause();
    }
    this.stopSynthesizer();
    this.isPlaying = false;
  }

  public getPlaying(): boolean {
    return this.isPlaying;
  }

  private initAudioContext(): AudioContext {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!this.audioCtx) {
      this.audioCtx = new AudioContextClass();
    }
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
    return this.audioCtx;
  }

  private startStarboyBeat(): void {
    if (this.isSynthesizing) return;
    this.isSynthesizing = true;

    try {
      const ctx = this.initAudioContext();

      // Master Gain
      this.masterGain = ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.001, ctx.currentTime);
      this.masterGain.gain.exponentialRampToValueAtTime(0.45, ctx.currentTime + 0.3);

      // Master Compressor for punchy, tight modern pop sound
      const compressor = ctx.createDynamicsCompressor();
      compressor.threshold.setValueAtTime(-18, ctx.currentTime);
      compressor.knee.setValueAtTime(12, ctx.currentTime);
      compressor.ratio.setValueAtTime(4, ctx.currentTime);
      compressor.attack.setValueAtTime(0.005, ctx.currentTime);
      compressor.release.setValueAtTime(0.15, ctx.currentTime);

      this.masterGain.connect(compressor);
      compressor.connect(ctx.destination);

      this.currentStep = 0;

      const scheduleStep = () => {
        if (!this.isSynthesizing || !this.audioCtx || !this.masterGain) return;
        const now = this.audioCtx.currentTime;
        const step = this.currentStep % 64; // 4 bars loop (16 steps per bar)
        const bar = Math.floor(step / 16);
        const beatInBar = step % 16;

        // ----------------------------------------------------
        // 1. DRUMS (Starboy 4-on-the-floor electro groove)
        // ----------------------------------------------------
        // Kick on beats 0, 4, 8, 12 (1, 2, 3, 4)
        if (beatInBar % 4 === 0) {
          this.triggerKick(ctx, now);
        }

        // Snare / Clap on beats 4 and 12 (beats 2 and 4)
        if (beatInBar === 4 || beatInBar === 12) {
          this.triggerSnareClap(ctx, now);
        }

        // 16th-note Hi-Hats (Crisp closed hat with slight groove)
        if (beatInBar % 2 === 0 || beatInBar === 3 || beatInBar === 7 || beatInBar === 11 || beatInBar === 15) {
          const isAccent = beatInBar % 4 === 2;
          this.triggerHiHat(ctx, now, isAccent);
        }

        // ----------------------------------------------------
        // 2. BASSLINE (The Weeknd / Daft Punk syncopated synth bass)
        // Progression: Gm (Bar 0) -> F (Bar 1) -> Eb (Bar 2) -> F (Bar 3)
        // ----------------------------------------------------
        const rootFreqs = [
          98.0,   // G2 (Gm)
          87.31,  // F2 (F)
          77.78,  // Eb2 (Eb)
          87.31,  // F2 (F)
        ];
        const rootFreq = rootFreqs[bar];

        // Syncopated Bass pattern: plays on 0, 2, 3, 6, 8, 10, 11, 14
        const bassSteps = [0, 2, 3, 6, 8, 10, 11, 14];
        if (bassSteps.includes(beatInBar)) {
          // Play root or octave up on step 11
          const pitch = beatInBar === 11 ? rootFreq * 1.5 : rootFreq;
          this.triggerBass(ctx, now, pitch);
        }

        // ----------------------------------------------------
        // 3. SYNTH CHORDS / ARPEGGIOS (Starboy Daft Punk synth sound)
        // ----------------------------------------------------
        // Chords chords hit on beat 1-and (step 2), beat 2-and (step 6), beat 3-and (step 10), beat 4 (step 12)
        const chordSteps = [2, 6, 10, 12, 14];
        if (chordSteps.includes(beatInBar)) {
          let chordNotes: number[] = [];
          if (bar === 0) {
            chordNotes = [392.0, 466.16, 587.33]; // G4, Bb4, D5 (Gm)
          } else if (bar === 1) {
            chordNotes = [349.23, 440.0, 523.25]; // F4, A4, C5 (F)
          } else if (bar === 2) {
            chordNotes = [311.13, 392.0, 466.16]; // Eb4, G4, Bb4 (Eb)
          } else {
            chordNotes = [349.23, 440.0, 523.25]; // F4, A4, C5 (F)
          }
          this.triggerSynthChord(ctx, now, chordNotes);
        }

        // Catchy Starboy synth arpeggios on higher register (steps 0, 4, 8, 12, 14)
        if (beatInBar === 0 || beatInBar === 4 || beatInBar === 8 || beatInBar === 12) {
          const leadNotes = [587.33, 783.99, 880.0, 698.46]; // D5, G5, A5, F5
          const leadFreq = leadNotes[bar];
          this.triggerLeadPluck(ctx, now, leadFreq);
        }

        this.currentStep++;
      };

      scheduleStep();
      this.timerId = window.setInterval(scheduleStep, this.stepIntervalMs);
    } catch (e) {
      console.warn('Web Audio Starboy beat error:', e);
    }
  }

  // --- Instrument Synthesizers ---

  // 1. Kick Drum
  private triggerKick(ctx: AudioContext, time: number) {
    if (!this.masterGain) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    // Frequency drop for deep punchy 808 kick
    osc.frequency.setValueAtTime(150, time);
    osc.frequency.exponentialRampToValueAtTime(42, time + 0.12);

    gain.gain.setValueAtTime(0.85, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.32);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(time);
    osc.stop(time + 0.34);
  }

  // 2. Snare / Clap
  private triggerSnareClap(ctx: AudioContext, time: number) {
    if (!this.masterGain) return;

    // Noise component
    const bufferSize = ctx.sampleRate * 0.18;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.setValueAtTime(950, time);

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.55, time);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, time + 0.18);

    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(this.masterGain);

    // Tonal snap body
    const osc = ctx.createOscillator();
    const oscGain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(180, time);
    osc.frequency.exponentialRampToValueAtTime(90, time + 0.08);

    oscGain.gain.setValueAtTime(0.4, time);
    oscGain.gain.exponentialRampToValueAtTime(0.001, time + 0.1);

    osc.connect(oscGain);
    oscGain.connect(this.masterGain);

    noise.start(time);
    osc.start(time);
    noise.stop(time + 0.2);
    osc.stop(time + 0.12);
  }

  // 3. Hi-Hat
  private triggerHiHat(ctx: AudioContext, time: number, isAccent: boolean) {
    if (!this.masterGain) return;
    const bufferSize = ctx.sampleRate * 0.05;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.setValueAtTime(7500, time);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(isAccent ? 0.25 : 0.12, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + (isAccent ? 0.07 : 0.04));

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    noise.start(time);
    noise.stop(time + 0.08);
  }

  // 4. Synth Bass (Starboy characteristic resonant electro bass)
  private triggerBass(ctx: AudioContext, time: number, freq: number) {
    if (!this.masterGain) return;
    const osc = ctx.createOscillator();
    const filter = ctx.createBiquadFilter();
    const gain = ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(freq, time);

    // Resonant lowpass filter with punchy attack
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(550, time);
    filter.frequency.exponentialRampToValueAtTime(140, time + 0.14);
    filter.Q.setValueAtTime(4.0, time);

    gain.gain.setValueAtTime(0.38, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.18);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc.start(time);
    osc.stop(time + 0.2);
  }

  // 5. Synth Chords
  private triggerSynthChord(ctx: AudioContext, time: number, freqs: number[]) {
    if (!this.masterGain) return;

    freqs.forEach((freq) => {
      const osc = ctx.createOscillator();
      const filter = ctx.createBiquadFilter();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, time);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1800, time);
      filter.frequency.exponentialRampToValueAtTime(600, time + 0.25);

      gain.gain.setValueAtTime(0.08, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + 0.28);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain!);

      osc.start(time);
      osc.stop(time + 0.3);
    });
  }

  // 6. Lead Pluck (Melodic shine)
  private triggerLeadPluck(ctx: AudioContext, time: number, freq: number) {
    if (!this.masterGain) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'square';
    osc.frequency.setValueAtTime(freq, time);

    gain.gain.setValueAtTime(0.09, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.35);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(time);
    osc.stop(time + 0.36);
  }

  private stopSynthesizer(): void {
    this.isSynthesizing = false;
    if (this.timerId !== null) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
    if (this.masterGain && this.audioCtx) {
      try {
        const now = this.audioCtx.currentTime;
        this.masterGain.gain.linearRampToValueAtTime(0.0001, now + 0.2);
      } catch {
        // ignore
      }
    }
  }

  public setAudioPath(path: string): void {
    this.currentFilePath = path;
    if (this.audio) {
      this.audio.src = path;
    }
  }
}

export const romanticAudio = new StarboyBeatPlayer();
