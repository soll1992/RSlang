import * as React from 'react';
import { FC } from 'react';
import { useDispatch } from 'react-redux';
import './home.scss';
import { titleChange } from '../../redux/actions/actions';
import img1 from '../../assets/img/home/5.webp';
import img2 from '../../assets/img/home/18.webp';
import img3 from '../../assets/img/home/11.webp';

const Functional: FC = () => {
  const dispatch = useDispatch();
  const titleChangeClick = (text: string) => {
    dispatch(titleChange(text));
  };

  return (
    <div className="app-functional">
      <h2 className="app-functional-title subtitle">Функционал приложения</h2>
      <div className="app-functional-container">
        <div className="app-functional-item">
          <div className="app-functional-img-wrap">
            <img className="app-functional-img" src={img1} alt=""></img>
          </div>
          <h3 className="app-functional-item__title">Учебник</h3>
          <p className="app-functional-item__text">
            6 разделов с разным уровнем сложности, в каждом разделе по 600 слов.
          </p>
          <a className="app-functional-item__url" href="#/textbook/A1/1">
            <button onClick={() => titleChangeClick('учебник')} className="btn-2">
              Открыть учебник
            </button>
          </a>
        </div>
        <div className="app-functional-item">
          <div className="app-functional-img-wrap">
            <img className="app-functional-img" src={img2} alt=""></img>
          </div>
          <h3 className="app-functional-item__title">Миниигры</h3>
          <p className="app-functional-item__text">
            Для изучения и закрепления слов в приложении есть игры Спринт и Аудиовызов, которые помогут вам в игровой
            форме «прокачать» словарный запас.
          </p>
          <a className="app-functional-item__url" href="#/game-difficulty">
            <button onClick={() => titleChangeClick('миниигры')} className="btn-2">
              Выбрать игру
            </button>
          </a>
        </div>
        <div className="app-functional-item">
          <div className="app-functional-img-wrap">
            <img className="app-functional-img" src={img3} alt=""></img>
          </div>
          <h3 className="app-functional-item__title">Статистика</h3>
          <p className="app-functional-item__text">
            Весь прогресс обучения можно посмотреть в статистике, где представлены данные как за текущий день, так и за
            весь период обучения.
          </p>
          <a className="app-functional-item__url" href="#/statistics">
            <button onClick={() => titleChangeClick('статистика')} className="btn-2">
              Открыть статистику
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Functional;
