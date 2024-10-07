import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Score } from '../types';

interface GameSelectionProps {
  onLogout: () => void;
}

const GameSelection: React.FC<GameSelectionProps> = ({ onLogout }) => {
  const [aimTrainerTopScores, setAimTrainerTopScores] = useState<Score[]>([]);

  useEffect(() => {
    const storedLeaderboard = localStorage.getItem('aimTrainerLeaderboard');
    if (storedLeaderboard) {
      const leaderboard: Score[] = JSON.parse(storedLeaderboard);
      setAimTrainerTopScores(leaderboard.slice(0, 3));
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-4xl font-bold mb-8">Game Selection</h1>
      <div className="grid grid-cols-1 gap-8 mb-8 w-full max-w-md">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <Link
            to="/aim-trainer"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded text-center block mb-4"
          >
            Aim Trainer
          </Link>
          <h3 className="text-xl font-semibold mb-2">Top 3 Scores:</h3>
          <ul>
            {aimTrainerTopScores.map((score, index) => (
              <li key={index} className="mb-1">
                {score.name}: {score.score}
              </li>
            ))}
            {aimTrainerTopScores.length === 0 && (
              <li className="text-gray-500">No scores yet</li>
            )}
          </ul>
        </div>
        {/* Add more game options here as they become available */}
      </div>
      <button
        onClick={onLogout}
        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
      >
        Logout
      </button>
    </div>
  );
};

export default GameSelection;