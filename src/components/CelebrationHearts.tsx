import { useEffect, useState } from "react";

const CelebrationHearts = () => {
  const [hearts, setHearts] = useState<Array<{
    id: number;
    left: number;
    size: number;
    delay: number;
    duration: number;
  }>>([]);

  useEffect(() => {
    const generated = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: Math.random() * 30 + 15,
      delay: Math.random() * 3,
      duration: Math.random() * 4 + 4,
    }));
    setHearts(generated);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute text-valentine-rose"
          style={{
            left: `${heart.left}%`,
            bottom: "-50px",
            fontSize: `${heart.size}px`,
            animation: `celebration-hearts ${heart.duration}s ease-out ${heart.delay}s infinite`,
            opacity: 0.7,
          }}
        >
          ♥
        </div>
      ))}
    </div>
  );
};

export default CelebrationHearts;
