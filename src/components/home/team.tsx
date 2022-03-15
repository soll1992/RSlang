import * as React from 'react';
import { FC } from 'react';
import './home.scss';
import kostik from '../../assets/img/home/kostik.webp';
import anton from '../../assets/img/home/anton.webp';
import darija from '../../assets/img/home/darija.webp';

const Team: FC = () => {
  return (
    <div className="app-team">
      <h2 className="app-team-title subtitle">Команда</h2>
      <div className="app-team-container">
        <div className="app-team-item">
          <div className="app-team-header">
            <div className="app-team-img-wrap">
              <img className="app-team-img" src={kostik} alt=""></img>
            </div>
            <div className="app-team-item__title-wrap">
              <h3 className="app-team-item__title">Константин</h3>
              <a className="app-team-item__url" href="https://github.com/ConstantineTU" target="_blank">
                <div className="footer__github-wrap black">
                  Developer<div className="footer__github black"></div>
                </div>
              </a>
              <p className="app-team-item__text">
                Подготовил бэкенд, структуру проекта, функционал авторизации, главную страницу и дизайн проекта
              </p>
            </div>
          </div>
        </div>
        <div className="app-team-item">
          <div className="app-team-header">
            <div className="app-team-img-wrap">
              <img className="app-team-img" src={anton} alt=""></img>
            </div>
            <div className="app-team-item__title-wrap">
              <h3 className="app-team-item__title">Антон</h3>
              <a className="app-team-item__url" href="https://github.com/soll1992" target="_blank">
                <div className="footer__github-wrap black">
                  Developer<div className="footer__github black"></div>
                </div>
              </a>
              <p className="app-team-item__text">
                Сделал функционал минигр Спринт и Аудиовызов, настроил их для взаимной работы с учебником
              </p>
            </div>
          </div>
        </div>
        <div className="app-team-item">
          <div className="app-team-header">
            <div className="app-team-img-wrap">
              <img className="app-team-img" src={darija} alt=""></img>
            </div>
            <div className="app-team-item__title-wrap">
              <h3 className="app-team-item__title">Дарья</h3>
              <a className="app-team-item__url" href="https://github.com/dariija" target="_blank">
                <div className="footer__github-wrap black">
                  Developer<div className="footer__github black"></div>
                </div>
              </a>
              <p className="app-team-item__text">
                Разработала электронный учебник, список слов, страницу статистики и прогресс изучения.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Team;
