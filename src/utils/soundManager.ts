/**
 * SOUND & MUSIC ENGINE
 * 
 * Provides:
 * 1. Background romantic soundtrack (HTML5 Audio or graceful Web Audio gentle acoustic lullaby/piano chords)
 * 2. Subtle handcrafted UI sound effects: chime, notification 'ping', camera click, page turn
 */

class SoundManager {
  private audioCtx: AudioContext | null = null;
  private isMusicPlaying: boolean = false;
  private musicInterval: number | null = null;
  private htmlAudio: HTMLAudioElement | null = null;
  private volume: number = 0.4;
  private onStateChange: ((isPlaying: boolean) => void) | null = null;

  private initAudioContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.audioCtx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.audioCtx = new AudioCtx();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
    return this.audioCtx;
  }

  public setOnStateChange(cb: (isPlaying: boolean) => void) {
    this.onStateChange = cb;
  }

  public getIsPlaying(): boolean {
    return this.isMusicPlaying;
  }

  public toggleMusic(customUrl?: string) {
    if (this.isMusicPlaying) {
      this.pauseMusic();
    } else {
      this.playMusic(customUrl);
    }
  }

  public playMusic(customUrl?: string) {
    const ctx = this.initAudioContext();
    this.isMusicPlaying = true;
    if (this.onStateChange) this.onStateChange(true);

    // If customUrl is a direct audio file (.mp3, .ogg, .wav), try HTML5 Audio
    const isDirectAudio = customUrl && (
      customUrl.endsWith('.mp3') || 
      customUrl.endsWith('.wav') || 
      customUrl.endsWith('.ogg') || 
      customUrl.includes('/download/') ||
      customUrl.includes('.mp3?')
    );

    if (isDirectAudio && customUrl) {
      if (!this.htmlAudio) {
        this.htmlAudio = new Audio(customUrl);
        this.htmlAudio.loop = true;
        this.htmlAudio.volume = this.volume;
      }
      this.htmlAudio.play().catch(() => {
        // Fallback to synthesized melody if direct audio fails
        this.startRomanticMelodyLoop(ctx);
      });
    } else {
      // Use built-in sweet music box / romantic lullaby synthesis
      this.startRomanticMelodyLoop(ctx);
    }
  }

  public pauseMusic() {
    this.isMusicPlaying = false;
    if (this.onStateChange) this.onStateChange(false);

    if (this.htmlAudio) {
      this.htmlAudio.pause();
    }

    if (this.musicInterval) {
      window.clearInterval(this.musicInterval);
      this.musicInterval = null;
    }
  }

  /**
   * Gentle, warm romantic music box melody
   * Played using pure Web Audio API sine/triangle waves with smooth exponential decays.
   * Beautiful, sweet, intimate progression: C - G/B - Am - F - G - C
   */
  private startRomanticMelodyLoop(ctx: AudioContext | null) {
    if (!ctx) return;
    if (this.musicInterval) {
      window.clearInterval(this.musicInterval);
    }

    // Notes frequencies in Hz (sweet gentle music box register)
    const notes: Record<string, number> = {
      'C4': 261.63, 'D4': 293.66, 'E4': 329.63, 'F4': 349.23, 'G4': 392.00, 'A4': 440.00, 'B4': 493.88,
      'C5': 523.25, 'D5': 587.33, 'E5': 659.25, 'F5': 698.46, 'G5': 783.99, 'A5': 880.00, 'B5': 987.77,
      'C6': 1046.50
    };

    // Warm, romantic, hopeful melody pattern
    const melody: Array<{ note: string; dur: number; bass?: string }> = [
      { note: 'E5', dur: 0.6, bass: 'C4' },
      { note: 'G5', dur: 0.6 },
      { note: 'C6', dur: 1.0 },
      { note: 'B5', dur: 0.6, bass: 'G4' },
      { note: 'G5', dur: 0.6 },
      { note: 'A5', dur: 1.2, bass: 'A4' },
      { note: 'G5', dur: 0.6 },
      { note: 'E5', dur: 0.6 },
      { note: 'F5', dur: 1.0, bass: 'F4' },
      { note: 'E5', dur: 0.5 },
      { note: 'D5', dur: 0.8, bass: 'G4' },
      { note: 'E5', dur: 0.5 },
      { note: 'C5', dur: 1.4, bass: 'C4' },
      { note: 'D5', dur: 0.6 },
      { note: 'E5', dur: 0.6 },
      { note: 'G5', dur: 1.2, bass: 'G4' },
      { note: 'A5', dur: 0.6, bass: 'A4' },
      { note: 'C6', dur: 0.8 },
      { note: 'B5', dur: 0.8, bass: 'G4' },
      { note: 'A5', dur: 0.6 },
      { note: 'G5', dur: 1.4, bass: 'C4' },
      { note: 'F5', dur: 0.6, bass: 'F4' },
      { note: 'E5', dur: 0.6 },
      { note: 'D5', dur: 1.2, bass: 'G4' },
      { note: 'C5', dur: 2.0, bass: 'C4' }
    ];

    let noteIdx = 0;

    const playNextNote = () => {
      if (!this.isMusicPlaying || !this.audioCtx) return;
      const step = melody[noteIdx];
      const freq = notes[step.note];
      
      if (freq) {
        this.playPluckNote(freq, step.dur * 0.85, 0.12 * this.volume);
      }
      if (step.bass && notes[step.bass]) {
        this.playWarmBass(notes[step.bass], step.dur * 1.5, 0.08 * this.volume);
      }

      noteIdx = (noteIdx + 1) % melody.length;
    };

    playNextNote();
    this.musicInterval = window.setInterval(playNextNote, 680);
  }

  private playPluckNote(freq: number, duration: number, gainVal: number) {
    if (!this.audioCtx) return;
    try {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      
      // Soft gentle tone (sine blended with triangle for music-box sparkle)
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);

      const now = this.audioCtx.currentTime;
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(gainVal, now + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(now);
      osc.stop(now + duration + 0.1);
    } catch {
      // Ignore audio errors
    }
  }

  private playWarmBass(freq: number, duration: number, gainVal: number) {
    if (!this.audioCtx) return;
    try {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);

      const now = this.audioCtx.currentTime;
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(gainVal, now + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(now);
      osc.stop(now + duration + 0.1);
    } catch {
      // Ignore audio errors
    }
  }

  // --- Sound Effects ---

  /** Soft ping when notification or message appears */
  public playNotification() {
    const ctx = this.initAudioContext();
    if (!ctx) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      const now = ctx.currentTime;
      osc.frequency.setValueAtTime(587.33, now); // D5
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.15); // A5
      gain.gain.setValueAtTime(0.12 * this.volume, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.4);
    } catch {
      // silence
    }
  }

  /** Sweet soft heart pop or button click */
  public playPop() {
    const ctx = this.initAudioContext();
    if (!ctx) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      const now = ctx.currentTime;
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(659.25, now + 0.08);
      gain.gain.setValueAtTime(0.08 * this.volume, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.18);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.2);
    } catch {
      // silence
    }
  }

  /** Sweet magical chime for Easter egg or accept button */
  public playChime() {
    const ctx = this.initAudioContext();
    if (!ctx) return;
    const chords = [523.25, 659.25, 783.99, 1046.50];
    chords.forEach((freq, idx) => {
      setTimeout(() => {
        if (!this.audioCtx) return;
        try {
          const osc = this.audioCtx.createOscillator();
          const gain = this.audioCtx.createGain();
          osc.type = 'sine';
          const now = this.audioCtx.currentTime;
          osc.frequency.setValueAtTime(freq, now);
          gain.gain.setValueAtTime(0.15 * this.volume, now);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.6);
          osc.connect(gain);
          gain.connect(this.audioCtx.destination);
          osc.start(now);
          osc.stop(now + 0.7);
        } catch {
          // ignore
        }
      }, idx * 100);
    });
  }

  /** Camera shutter click for selfie scene */
  public playCameraClick() {
    const ctx = this.initAudioContext();
    if (!ctx) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      const now = ctx.currentTime;
      osc.frequency.setValueAtTime(1200, now);
      osc.frequency.setValueAtTime(800, now + 0.05);
      gain.gain.setValueAtTime(0.15 * this.volume, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.15);
    } catch {
      // ignore
    }
  }
}

export const soundManager = new SoundManager();
