import { useState, useCallback, useRef, useEffect } from "react";
import FloatingHearts from "@/components/FloatingHearts";
import Confetti from "@/components/Confetti";
import CelebrationHearts from "@/components/CelebrationHearts";
import { createRomanticAmbience } from "@/lib/romantic-audio";

const Index = () => {
  const [accepted, setAccepted] = useState(false);
  const [noAttempts, setNoAttempts] = useState(0);
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [showCelebration, setShowCelebration] = useState(false);
  const [cardVisible, setCardVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<ReturnType<typeof createRomanticAmbience> | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setCardVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  const dodgeNo = useCallback(() => {
    const range = 200;
    setNoPosition({
      x: (Math.random() - 0.5) * range * 2,
      y: (Math.random() - 0.5) * range,
    });
    setNoAttempts((prev) => prev + 1);
  }, []);

  const handleYes = () => {
    setAccepted(true);
    setTimeout(() => setShowCelebration(true), 600);
    // Start romantic ambience after user interaction
    if (!audioRef.current) {
      audioRef.current = createRomanticAmbience();
    }
    audioRef.current.play();
  };

  const yesScale = 1 + noAttempts * 0.06;
  const noScale = Math.max(0.5, 1 - noAttempts * 0.08);
  const glowIntensity = Math.min(noAttempts * 4, 25);

  if (accepted) {
    return (
      <div
        className="fixed inset-0 flex items-center justify-center overflow-hidden transition-all duration-1000"
        style={{
          background: "linear-gradient(135deg, hsl(350, 60%, 92%) 0%, hsl(20, 100%, 97%) 50%, hsl(350, 80%, 88%) 100%)",
        }}
      >
        {showCelebration && <Confetti />}
        {showCelebration && <CelebrationHearts />}

        <div
          className={`text-center z-30 px-6 transition-all duration-1000 ${
            showCelebration ? "opacity-100 scale-100" : "opacity-0 scale-90"
          }`}
        >
          <div className="text-6xl sm:text-8xl mb-8" style={{ animation: "pulse-heart 2s ease-in-out infinite" }}>
            ❤️
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold text-valentine-rose mb-6 leading-tight">
            You just made me the
            <br />
            happiest person alive
          </h1>
          <p className="text-valentine-rose/70 text-lg sm:text-xl font-light">❤️</p>
        </div>

        <footer className="fixed bottom-6 left-0 right-0 text-center z-30">
          <p className="text-valentine-rose/40 text-sm font-light">Made with ❤️ by Jirid</p>
        </footer>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: "linear-gradient(160deg, hsl(20, 100%, 97%) 0%, hsl(350, 60%, 95%) 40%, hsl(350, 80%, 88%) 100%)",
      }}
    >
      <FloatingHearts />

      {/* Main Card */}
      <div
        className={`relative z-10 w-[90vw] max-w-md mx-auto px-8 py-10 sm:px-12 sm:py-14 rounded-3xl text-center transition-all duration-1000 ease-out ${
          cardVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"
        }`}
        style={{
          background: "rgba(255, 255, 255, 0.25)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(255, 255, 255, 0.4)",
          boxShadow: "0 8px 32px rgba(201, 24, 74, 0.1), 0 0 80px rgba(201, 24, 74, 0.05)",
        }}
      >
        {/* Animated Heart */}
        <div
          className="text-5xl sm:text-6xl mb-6"
          style={{ animation: "pulse-heart 3s ease-in-out infinite" }}
        >
          💖
        </div>

        {/* Headline */}
        <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 leading-snug">
          Will you be my Valentine?
        </h1>

        {/* Subtext */}
        <p className="text-muted-foreground text-sm sm:text-base mb-10 font-light italic">
          This is a very important question… choose wisely.
        </p>

        {/* Buttons */}
        <div className="flex items-center justify-center gap-4 relative min-h-[60px]">
          {/* Yes Button */}
          <button
            onClick={handleYes}
            className="relative px-8 py-3 rounded-full font-semibold text-base sm:text-lg transition-all duration-300 ease-out cursor-pointer"
            style={{
              transform: `scale(${yesScale})`,
              background: "linear-gradient(135deg, hsl(346, 82%, 44%) 0%, hsl(346, 70%, 55%) 100%)",
              color: "hsl(20, 100%, 97%)",
              boxShadow: `0 4px 15px rgba(201, 24, 74, 0.3), 0 0 ${glowIntensity}px rgba(201, 24, 74, 0.4)`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = `0 6px 25px rgba(201, 24, 74, 0.4), 0 0 ${glowIntensity + 10}px rgba(201, 24, 74, 0.5)`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = `0 4px 15px rgba(201, 24, 74, 0.3), 0 0 ${glowIntensity}px rgba(201, 24, 74, 0.4)`;
            }}
          >
            Yes 💖
          </button>

          {/* No Button */}
          <button
            onMouseEnter={dodgeNo}
            onClick={dodgeNo}
            className="relative px-6 py-3 rounded-full font-medium text-sm sm:text-base transition-all duration-300 ease-out cursor-pointer"
            style={{
              transform: `translate(${noPosition.x}px, ${noPosition.y}px) scale(${noScale})`,
              background: "rgba(255, 255, 255, 0.5)",
              color: "hsl(350, 15%, 50%)",
              border: "1px solid rgba(201, 24, 74, 0.15)",
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.05)",
            }}
          >
            No 😅
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="fixed bottom-6 left-0 right-0 text-center z-10">
        <p className="text-muted-foreground/60 text-xs sm:text-sm font-light">
          Made with ❤️ by Jirid
        </p>
      </footer>
    </div>
  );
};

export default Index;
