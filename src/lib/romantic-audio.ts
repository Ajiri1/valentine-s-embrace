/**
 * Generates a soft, romantic ambient pad using the Web Audio API.
 * Creates layered sine waves with gentle modulation for a dreamy feel.
 */
export const createRomanticAmbience = (): { play: () => void; stop: () => void } => {
  let ctx: AudioContext | null = null;
  let nodes: { osc: OscillatorNode; gain: GainNode }[] = [];
  let masterGain: GainNode | null = null;
  let lfo: OscillatorNode | null = null;
  let playing = false;

  // Romantic chord: Cmaj7 + extensions in multiple octaves
  const frequencies = [
    130.81, // C3
    164.81, // E3
    196.00, // G3
    246.94, // B3
    261.63, // C4
    329.63, // E4
    392.00, // G4
    493.88, // B4
  ];

  const play = () => {
    if (playing) return;
    playing = true;

    ctx = new AudioContext();
    masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0, ctx.currentTime);
    masterGain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 4); // Slow fade in
    masterGain.connect(ctx.destination);

    // LFO for gentle volume modulation
    lfo = ctx.createOscillator();
    lfo.frequency.value = 0.15; // Very slow wobble
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 0.02;
    lfo.connect(lfoGain);
    lfo.start();

    frequencies.forEach((freq, i) => {
      if (!ctx || !masterGain) return;

      const osc = ctx.createOscillator();
      osc.type = "sine";
      osc.frequency.value = freq;
      // Slight detuning for warmth
      osc.detune.value = (Math.random() - 0.5) * 8;

      const gain = ctx.createGain();
      // Higher notes quieter for balance
      const vol = i < 4 ? 0.15 : 0.08;
      gain.gain.value = vol;

      // Connect LFO to gain for shimmer
      lfoGain.connect(gain.gain);

      osc.connect(gain);
      gain.connect(masterGain);
      osc.start(ctx.currentTime + i * 0.3); // Stagger entries

      nodes.push({ osc, gain });
    });

    lfo.start();
  };

  const stop = () => {
    if (!playing || !ctx || !masterGain) return;
    playing = false;

    masterGain.gain.linearRampToValueAtTime(0, ctx.currentTime + 2);

    setTimeout(() => {
      nodes.forEach(({ osc }) => {
        try { osc.stop(); } catch {}
      });
      try { lfo?.stop(); } catch {}
      ctx?.close();
      nodes = [];
      ctx = null;
      masterGain = null;
      lfo = null;
    }, 2500);
  };

  return { play, stop };
};
