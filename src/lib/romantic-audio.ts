/**
 * Generates a rich, romantic ambient soundscape using the Web Audio API.
 * Features evolving chord progressions, arpeggiated melodies, warm reverb,
 * and gentle dynamics for a truly romantic feel.
 */
export const createRomanticAmbience = (): { play: () => void; stop: () => void } => {
  let ctx: AudioContext | null = null;
  let playing = false;
  let timeouts: ReturnType<typeof setTimeout>[] = [];
  let allNodes: AudioNode[] = [];

  // Romantic chord progression: I - vi - IV - V in C major
  const chords = [
    [261.63, 329.63, 392.00, 493.88],  // Cmaj7
    [220.00, 261.63, 329.63, 392.00],  // Am7
    [174.61, 261.63, 329.63, 440.00],  // Fmaj7
    [196.00, 246.94, 293.66, 392.00],  // G7
  ];

  // Melody notes (pentatonic for sweetness)
  const melodyNotes = [
    523.25, 587.33, 659.25, 783.99, 880.00, // C5, D5, E5, G5, A5
    783.99, 659.25, 587.33, 523.25, 440.00, // descending
  ];

  const createReverb = (audioCtx: AudioContext): ConvolverNode => {
    const convolver = audioCtx.createConvolver();
    const rate = audioCtx.sampleRate;
    const length = rate * 3;
    const impulse = audioCtx.createBuffer(2, length, rate);
    for (let channel = 0; channel < 2; channel++) {
      const data = impulse.getChannelData(channel);
      for (let i = 0; i < length; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, 2.5);
      }
    }
    convolver.buffer = impulse;
    return convolver;
  };

  const playNote = (
    audioCtx: AudioContext,
    dest: AudioNode,
    freq: number,
    startTime: number,
    duration: number,
    volume: number,
    type: OscillatorType = "sine"
  ) => {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    osc.detune.value = (Math.random() - 0.5) * 6;

    // Soft ADSR envelope
    gain.gain.setValueAtTime(0, startTime);
    gain.gain.linearRampToValueAtTime(volume, startTime + 0.3);
    gain.gain.setValueAtTime(volume * 0.8, startTime + duration * 0.5);
    gain.gain.linearRampToValueAtTime(0, startTime + duration);

    osc.connect(gain);
    gain.connect(dest);
    osc.start(startTime);
    osc.stop(startTime + duration + 0.1);
    allNodes.push(osc, gain);
  };

  const play = () => {
    if (playing) return;
    playing = true;

    ctx = new AudioContext();
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0, ctx.currentTime);
    masterGain.gain.linearRampToValueAtTime(0.18, ctx.currentTime + 3);

    const reverb = createReverb(ctx);
    const reverbGain = ctx.createGain();
    reverbGain.gain.value = 0.4;

    const dryGain = ctx.createGain();
    dryGain.gain.value = 0.7;

    reverb.connect(reverbGain);
    reverbGain.connect(masterGain);
    dryGain.connect(masterGain);
    masterGain.connect(ctx.destination);

    allNodes.push(masterGain, reverb, reverbGain, dryGain);

    const mixBus = ctx.createGain();
    mixBus.gain.value = 1;
    mixBus.connect(dryGain);
    mixBus.connect(reverb);
    allNodes.push(mixBus);

    // Sub bass layer for warmth
    const sub = ctx.createOscillator();
    const subGain = ctx.createGain();
    sub.type = "sine";
    sub.frequency.value = 65.41; // C2
    subGain.gain.setValueAtTime(0, ctx.currentTime);
    subGain.gain.linearRampToValueAtTime(0.06, ctx.currentTime + 4);
    sub.connect(subGain);
    subGain.connect(mixBus);
    sub.start();
    allNodes.push(sub, subGain);

    const scheduleChordCycle = (startTime: number) => {
      if (!playing || !ctx) return;

      const chordDuration = 4; // seconds per chord
      chords.forEach((chord, ci) => {
        const chordStart = startTime + ci * chordDuration;

        // Pad layer (warm sine+triangle blend)
        chord.forEach((freq) => {
          playNote(ctx!, mixBus, freq, chordStart, chordDuration * 0.95, 0.04, "sine");
          playNote(ctx!, mixBus, freq, chordStart, chordDuration * 0.95, 0.015, "triangle");
          // Octave below for richness
          playNote(ctx!, mixBus, freq / 2, chordStart, chordDuration * 0.95, 0.02, "sine");
        });

        // Arpeggiated melody on top
        const notesPerChord = 4;
        for (let n = 0; n < notesPerChord; n++) {
          const noteIdx = (ci * notesPerChord + n) % melodyNotes.length;
          const noteTime = chordStart + n * (chordDuration / notesPerChord);
          playNote(ctx!, mixBus, melodyNotes[noteIdx], noteTime, 1.2, 0.025, "sine");
        }
      });

      // Schedule next cycle
      const cycleDuration = chords.length * chordDuration;
      const t = setTimeout(() => {
        if (playing && ctx) {
          scheduleChordCycle(startTime + cycleDuration);
        }
      }, (cycleDuration - 1) * 1000);
      timeouts.push(t);
    };

    scheduleChordCycle(ctx.currentTime + 0.5);
  };

  const stop = () => {
    if (!playing) return;
    playing = false;

    timeouts.forEach(clearTimeout);
    timeouts = [];

    if (ctx) {
      try {
        ctx.close();
      } catch {}
    }
    allNodes = [];
    ctx = null;
  };

  return { play, stop };
};
