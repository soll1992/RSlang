import React, { useEffect } from 'react';
import { NavLink } from '../link/link';
import ButtonRef from '../button-ref/button-ref';
import './game-difficulty.scss';
import { useDispatch, useSelector } from 'react-redux';
import { fromMenu, changeDifficulty, changePage, selectSprint, selectAudiochallenge } from '../../redux/actions/actions';
import random from 'lodash/random'

interface RootState {
  gameDifficulty: {
    gameDifficulty: number;
  };
}

export default function SprintDifficulty() {

  const dispatch = useDispatch()
  const difficulty = useSelector((state: RootState) => state.gameDifficulty.gameDifficulty);
  const buttonsRefs = []

  useEffect(() => {
    buttonsRefs[difficulty].classList.add('select')
  }, [])

  function selectGameParams(i: number) {
    dispatch(changeDifficulty(i))
    buttonsRefs.forEach(ref => ref.classList.remove('select'))
    buttonsRefs[i].classList.add('select')
  }

  function navLinkHandler(game: string) {
    dispatch(changePage(random(0, 29)))
    dispatch(fromMenu())
    if (game === 'Спринт') {
      dispatch(selectSprint('sprint'))
      localStorage.setItem('game', 'sprint')
    } else {
      dispatch(selectAudiochallenge('audiochallenge'))
      localStorage.setItem('game', 'audiochallenge')
    }
  }

  return (
    <section>
      <h2 className='games-title'>Выберите уровень сложности:</h2>
      <div className="links-wrapper">
        {[...Array(6)].map((_, i) => (
          <ButtonRef refArr={buttonsRefs} class={`link dif-link${i + 1}`} textContent={String(i + 1)} onClick={() => selectGameParams(i)} key={i} />
        ))}
        {['Аудиовызов', 'Спринт'].map((game, i) => <NavLink class={`link dif-link${i + 1}`} onClick={() => navLinkHandler(game)} textContent={game} link='/game' key={i} />)}
      </div>
    </section>
  );
}
