import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import random from 'lodash/random';
import { NavLink } from '../link/link';
import ButtonRef from '../button-ref/button-ref';
import './game-difficulty.scss';
import {
  fromMenu,
  changeDifficulty,
  changePage,
  selectSprint,
  selectAudiochallenge,
} from '../../redux/actions/actions';
// От Кости
import audiocall from '../../assets/img/home/12.webp';
import sprint from '../../assets/img/home/15.webp';

interface RootState {
  gameDifficulty: {
    gameDifficulty: number;
  };
}

export default function SprintDifficulty() {
  const dispatch = useDispatch();
  const difficulty = useSelector((state: RootState) => state.gameDifficulty.gameDifficulty);
  const difficultyName = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
  const buttonsRefs = [];

  useEffect(() => {
    if (difficulty === 6) {
      (buttonsRefs[0] as HTMLButtonElement).classList.add('select');
    } else {
      (buttonsRefs[difficulty] as HTMLButtonElement).classList.add('select');
    }
  }, []);

  function selectGameParams(i: number) {
    dispatch(changeDifficulty(i));
    buttonsRefs.forEach((ref) => (ref as HTMLButtonElement).classList.remove('select'));
    (buttonsRefs[i] as HTMLButtonElement).classList.add('select');
  }

  function navLinkHandler(game: string) {
    dispatch(fromMenu());
    if (game === 'Спринт') {
      dispatch(selectSprint('sprint'));
      localStorage.setItem('game', 'sprint');
      dispatch(changePage(random(5, 29)));
    } else {
      dispatch(selectAudiochallenge('audiochallenge'));
      localStorage.setItem('game', 'audiochallenge');
      dispatch(changePage(random(0, 29)));
    }
  }

  return (
    <section className="games-section">
      <h2 className="games-title">Выберите уровень сложности и игру:</h2>

      <div className="games-section-container">
        <div className="games-wrap">
          <div className="games__btn-wrapper">
            <div className="links-wrapper">
              {difficultyName.map((name, i) => (
                <ButtonRef
                  refArr={buttonsRefs}
                  class={`btn-2 lvl link dif-link${i + 1}`}
                  textContent={name}
                  onClick={() => selectGameParams(i)}
                  key={i}
                />
              ))}
            </div>

            {['Аудиовызов', 'Спринт'].map((game, i) => (
              <div key={`div-${i}`} className="games__btn-wrap">
                <NavLink
                  class={`games-url link dif-link${i + 1}`}
                  onClick={() => navLinkHandler(game)}
                  textContent={game}
                  link="/game"
                  key={i}
                  i={i}
                  divClass={'games__btn-img'}
                  linkImg={[audiocall, sprint]}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
