import { useEffect, useState } from "react";

const Confetti = () => {
  const [pieces, setPieces] = useState<Array<{
    id: number;
    left: number;
    color: string;
    delay: number;
    duration: number;
    size: number;
    type: "circle" | "heart" | "square";
  }>>([]);

  useEffect(() => {
    const colors = [
      "hsl(346, 82%, 44%)",
      "hsl(43, 74%, 52%)",
      "hsl(350, 60%, 92%)",
      "hsl(350, 80%, 88%)",
      "hsl(20, 100%, 97%)",
    ];
    const types: ("circle" | "heart" | "square")[] = ["circle", "heart", "square"];
    const generated = Array.from({ length: 60 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      color: colors[Math.floor(Math.random() * colors.length)],
      delay: Math.random() * 2,
      duration: Math.random() * 2 + 2,
      size: Math.random() * 10 + 5,
      type: types[Math.floor(Math.random() * types.length)],
    }));
    setPieces(generated);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {pieces.map((piece) => (
        <div
          key={piece.id}
          className="absolute"
          style={{
            left: `${piece.left}%`,
            top: "-20px",
            animation: `confetti-fall ${piece.duration}s ease-in ${piece.delay}s forwards`,
          }}
        >
          {piece.type === "heart" ? (
            <span style={{ color: piece.color, fontSize: `${piece.size}px` }}>♥</span>
          ) : (
            <div
              style={{
                width: `${piece.size}px`,
                height: `${piece.size}px`,
                backgroundColor: piece.color,
                borderRadius: piece.type === "circle" ? "50%" : "2px",
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default Confetti;
