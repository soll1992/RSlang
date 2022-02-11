import React from 'react';
import { NavLink } from '../link/link';
import './game-difficulty.scss';
import { useDispatch } from 'react-redux';
import { changeDifficulty, changePage } from '../../redux/actions/actions';
import random from 'lodash/random'

export default function SprintDifficulty() {

    const dispatch = useDispatch()

    function selectGameParams (i: number) {
        dispatch(changePage(random(0,29)))
        dispatch(changeDifficulty(i))
    }

  return (
    <section>
      <h2>Спринт</h2>
      <p>Выберите уровень сложности:</p>
      <div className="links-wrapper">
        {[...Array(6)].map((_, i) => (
          <NavLink class={`link dif-link${i + 1}`} textContent={String(i + 1)} onClick={() => selectGameParams(i)} link='/game' key={i} />
        ))}
      </div>
    </section>
  );
}
