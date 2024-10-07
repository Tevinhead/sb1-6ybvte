import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import GameSelection from './components/GameSelection';
import AimTrainer from './components/AimTrainer';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/login" element={
            isAuthenticated ? <Navigate to="/games" /> : <Login onLogin={handleLogin} />
          } />
          <Route path="/register" element={
            isAuthenticated ? <Navigate to="/games" /> : <Register onRegister={handleLogin} />
          } />
          <Route path="/games" element={
            isAuthenticated ? <GameSelection onLogout={handleLogout} /> : <Navigate to="/login" />
          } />
          <Route path="/aim-trainer" element={
            isAuthenticated ? <AimTrainer /> : <Navigate to="/login" />
          } />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;