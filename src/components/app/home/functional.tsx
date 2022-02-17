import * as React from 'react';
import { FC } from 'react';
import './home.scss';
import './wave.scss';
import img1 from '../../../assets/img/home/5.png'
import img2 from '../../../assets/img/home/18.png'
import img3 from '../../../assets/img/home/11.png'


type Props = {

};

const Functional: FC<Props> = () => {
  return (
    <div className='app-functional'>
      <h2 className='app-functional-title subtitle'>Функционал приложения</h2>
      <div className='app-functional-container'>
        <div className="app-functional-item">
          <div className='app-functional-img-wrap'>
            <img className="app-functional-img" src={img1} alt=""></img>
          </div>
          <h3 className='app-functional-item__title'>Учебник</h3>
          <p className='app-functional-item__text'>6 разделов с разным уровнем сложности, в каждом разделе по 600 слов.</p>
          <button className='btn-2'>Открыть учебник</button>
        </div>
        <div className="app-functional-item">
          <div className='app-functional-img-wrap'>
            <img className="app-functional-img" src={img2} alt=""></img>
          </div>
          <h3 className='app-functional-item__title'>Миниигры</h3>
          <p className='app-functional-item__text'>Для изучения и закрепления слов в приложении есть игры Спринт и Аудиовызов, которые помогут вам в игровой форме «прокачать» словарный запас.</p>
          <button className='btn-2'>Выбрать игру</button>
        </div>
        <div className="app-functional-item">
          <div className='app-functional-img-wrap'>
            <img className="app-functional-img" src={img3} alt=""></img>
          </div>
          <h3 className='app-functional-item__title'>Статистика</h3>
          <p className='app-functional-item__text'>Весь прогресс обучения можно посмотреть в статистике, где представлены данные как за текущий день, так и за весь период обучения.</p>
          <button className='btn-2'>Открыть статистику</button>
        </div>
      </div>
    </div>
  );

}

export default Functional;
