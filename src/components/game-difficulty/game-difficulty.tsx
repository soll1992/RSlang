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
    (buttonsRefs[difficulty] as HTMLButtonElement).classList.add('select');
  }, []);

  function selectGameParams(i: number) {
    dispatch(changeDifficulty(i));
    buttonsRefs.forEach((ref) => (ref as HTMLButtonElement).classList.remove('select'));
    (buttonsRefs[i] as HTMLButtonElement).classList.add('select');
  }

  function navLinkHandler(game: string) {
    dispatch(changePage(random(0, 29)));
    dispatch(fromMenu());
    if (game === 'Спринт') {
      dispatch(selectSprint('sprint'));
      localStorage.setItem('game', 'sprint');
    } else {
      dispatch(selectAudiochallenge('audiochallenge'));
      localStorage.setItem('game', 'audiochallenge');
    }
  }

  return (
    <section>
      <h2 className='games-title'>Выберите уровень сложности:</h2>
      <div className="links-wrapper">
        {difficultyName.map((name, i) => (
          <ButtonRef
            refArr={buttonsRefs}
            class={`link dif-link${i + 1}`}
            textContent={name}
            onClick={() => selectGameParams(i)}
            key={i}
          />
        ))}
        {['Аудиовызов', 'Спринт'].map((game, i) => (
          <NavLink
            class={`link dif-link${i + 1}`}
            onClick={() => navLinkHandler(game)}
            textContent={game}
            link="/game"
            key={i}
          />
        ))}
      </div>
    </section>
  );
}
