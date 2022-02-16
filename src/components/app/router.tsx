import * as React from 'react';
import { HashRouter as BrowserRouter, Routes, Route } from 'react-router-dom';
import { Link } from 'react-router-dom'
import SprintDifficulty from '../sprint-difficulty/sprint-difficulty';
import Sprint from '../sprint-game/sprint-game';
import Textbook from '../textbook/Textbook';
import Home from './home/home';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/textbook/*" element={<Textbook />} />
        <Route path="/dictionary" element={<span>Словарь</span>} />
        <Route path="/audiocall" element={<span>Игра Аудиовызов</span>} />
        <Route path="/sprint" element={<SprintDifficulty />} />
        <Route path="/sprint/sprint-game" element={<Sprint />} />
        <Route path="/statistics" element={<span>Статистика</span>} />
        <Route path="/home/team" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
