import React, { Fragment } from 'react';
import { HashRouter as BrowserRouter, Routes, Route } from 'react-router-dom';
import SprintDifficulty from '../sprint-difficulty/sprint-difficulty';
import Sprint from '../sprint-game/sprint-game';
import Textbook from '../textbook/Textbook';
import Header from '../header/header';
import Statistics from '../statistics/Statistics';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={'/'}
          element={
            <Fragment>
              <Header />
              <main>Домашняя</main>
            </Fragment>
          }
        />
        <Route
          path={'/home'}
          element={
            <Fragment>
              <Header />
              <main>Домашняя</main>
            </Fragment>
          }
        />

        <Route
          path="/textbook/*"
          element={
            <Fragment>
              <Header />
              <Textbook />
            </Fragment>
          }
        />

        <Route
          path="/dictionary"
          element={
            <Fragment>
              <Header />
              <span>Словарь</span>
            </Fragment>
          }
        />

        <Route
          path="/audiocall"
          element={
            <Fragment>
              <Header />
              <span>Игра Аудиовызов</span>
            </Fragment>
          }
        />

        <Route
          path="/sprint"
          element={
            <Fragment>
              <Header />
              <SprintDifficulty />
            </Fragment>
          }
        />

        <Route
          path="/sprint/sprint-game"
          element={
            <Fragment>
              <Header />
              <Sprint />
            </Fragment>
          }
        />

        <Route
          path="/statistics"
          element={
            <Fragment>
              <Header />
              <Statistics />
            </Fragment>
          }
        />

        <Route
          path="/team"
          element={
            <Fragment>
              <Header />
              <span>Команда</span>
            </Fragment>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
