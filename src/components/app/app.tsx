import React, { Fragment } from 'react';
import {
  HashRouter as BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom'
import Header from '../header/header';


const App = () => {
  return <BrowserRouter>
    <Routes>
      <Route path={'/'} element={
        <Fragment>
          <Header />
          <main>Домашняя</main>

        </Fragment>} />
      <Route path={'/home'} element={
        <Fragment>
          <Header />
          <main>Домашняя</main>

        </Fragment>} />

      <Route path='/textbook' element={
        <Fragment>
          <Header />
          <span>Учебник</span>
        </Fragment>} />

      <Route path='/dictionary' element={
        <Fragment>
          <Header />
          <span>Словарь</span>
        </Fragment>} />

      <Route path='/audiocall' element={
        <Fragment>
          <Header />
          <span>Игра Аудиовызов</span>
        </Fragment>} />

      <Route path='/sprint' element={
        <Fragment>
          <Header />
          <span>Игра Спринт</span>
        </Fragment>} />

      <Route path='/statistics' element={
        <Fragment>
          <Header />
          <span>Статистика</span>
        </Fragment>} />

      <Route path='/team' element={
        <Fragment>
          <Header />
          <span>Команда</span>
        </Fragment>} />
    </Routes>
  </BrowserRouter>
};

export default App;
