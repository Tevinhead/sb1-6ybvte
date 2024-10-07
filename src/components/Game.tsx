import React, { useState, useEffect, useCallback } from 'react';
import Target from './Target';

interface GameProps {
  endGame: () => void;
  updateScore: (score: number) => void;
}

const Game: React.FC<GameProps> = ({ endGame, updateScore }) => {
  const [targets, setTargets] = useState<{ id: number; x: number; y: number; size: number }[]>([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);

  const generateTarget = useCallback(() => {
    const id = Date.now();
    const x = Math.random() * (window.innerWidth - 100);
    const y = Math.random() * (window.innerHeight - 100);
    const size = Math.random() * (80 - 20) + 20;
    return { id, x, y, size };
  }, []);

  const handleTargetClick = useCallback(() => {
    setScore((prevScore) => prevScore + 1);
    setTargets([generateTarget()]);
  }, [generateTarget]);

  useEffect(() => {
    updateScore(score);
  }, [score, updateScore]);

  useEffect(() => {
    setTargets([generateTarget()]);
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          endGame();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [endGame, generateTarget]);

  return (
    <div className="relative w-full h-screen">
      <div className="absolute top-4 left-4 text-xl font-bold">
        Time: {timeLeft}s | Score: {score}
      </div>
      {targets.map((target) => (
        <Target
          key={target.id}
          x={target.x}
          y={target.y}
          size={target.size}
          onClick={handleTargetClick}
        />
      ))}
    </div>
  );
};

export default Game;