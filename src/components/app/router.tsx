import * as React from 'react';
import { HashRouter as BrowserRouter, Routes, Route } from 'react-router-dom';
import SprintDifficulty from '../sprint-difficulty/sprint-difficulty';
import Sprint from '../sprint-game/sprint-game';
import Textbook from '../textbook/Textbook';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<span>Домашняя</span>} />
        <Route path="/home" element={<span>Домашняя</span>} />
        <Route path="/textbook/*" element={<Textbook />} />
        <Route path="/dictionary" element={<span>Словарь</span>} />
        <Route path="/audiocall" element={<span>Игра Аудиовызов</span>} />
        <Route path="/sprint" element={<SprintDifficulty />} />
        <Route path="/sprint/sprint-game" element={<Sprint />} />
        <Route path="/statistics" element={<span>Статистика</span>} />
        <Route path="/team" element={<span>Команда</span>} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
