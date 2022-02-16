import * as React from 'react';
import { HashRouter as BrowserRouter, Routes, Route } from 'react-router-dom';
import GameDifficulty from '../game-difficulty/game-difficulty';
import Games from '../games/games';
import Textbook from '../textbook/Textbook';
import Home from './home/home';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/textbook/*" element={<Textbook />} />
        <Route path="/game-difficulty" element={<GameDifficulty />} />
        <Route path="/game" element={<Games />} />
        <Route path="/statistics" element={<span>Статистика</span>} />
        <Route path="/home/team" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
