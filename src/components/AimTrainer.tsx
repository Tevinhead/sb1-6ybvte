import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import Game from './Game';
import Leaderboard from './Leaderboard';
import { Score } from '../types';

function AimTrainer() {
  const [gameState, setGameState] = useState<'start' | 'playing' | 'end'>('start');
  const [score, setScore] = useState(0);
  const [leaderboard, setLeaderboard] = useState<Score[]>([]);
  const [playerName, setPlayerName] = useState('');

  useEffect(() => {
    const storedLeaderboard = localStorage.getItem('aimTrainerLeaderboard');
    if (storedLeaderboard) {
      setLeaderboard(JSON.parse(storedLeaderboard));
    }
  }, []);

  const startGame = () => {
    setGameState('playing');
    setScore(0);
  };

  const endGame = useCallback(() => {
    setGameState('end');
  }, []);

  const updateScore = useCallback((newScore: number) => {
    setScore(newScore);
  }, []);

  const addToLeaderboard = () => {
    if (!playerName.trim()) {
      alert('Please enter your name');
      return;
    }

    const newScore: Score = { name: playerName, score };
    const updatedLeaderboard = [...leaderboard];
    const existingIndex = updatedLeaderboard.findIndex((s) => s.name === playerName);

    if (existingIndex !== -1) {
      if (score > updatedLeaderboard[existingIndex].score) {
        updatedLeaderboard[existingIndex] = newScore;
      }
    } else {
      updatedLeaderboard.push(newScore);
    }

    updatedLeaderboard.sort((a, b) => b.score - a.score);
    const newLeaderboard = updatedLeaderboard.slice(0, 10);
    setLeaderboard(newLeaderboard);
    localStorage.setItem('aimTrainerLeaderboard', JSON.stringify(newLeaderboard));
    setGameState('start');
    setPlayerName('');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-8">Aim Trainer</h1>
      {gameState === 'start' && (
        <div className="text-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
            onClick={startGame}
          >
            Start Game
          </button>
          <Link
            to="/games"
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          >
            Back to Game Selection
          </Link>
        </div>
      )}
      {gameState === 'playing' && (
        <Game endGame={endGame} updateScore={updateScore} />
      )}
      {gameState === 'end' && (
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Game Over</h2>
          <p className="text-xl mb-4">Your score: {score}</p>
          <div>
            <input
              type="text"
              placeholder="Enter your name"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              className="border-2 border-gray-300 p-2 rounded mr-2"
            />
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              onClick={addToLeaderboard}
            >
              Submit Score
            </button>
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
            onClick={() => setGameState('start')}
          >
            Play Again
          </button>
        </div>
      )}
      <Leaderboard scores={leaderboard} />
    </div>
  );
}

export default AimTrainer;