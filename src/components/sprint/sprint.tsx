import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addMoney, getMoney, addName, getName, } from '../../redux/actions/actions'
import SprintDifficulty from '../sprint-difficulty/sprint-difficulty'

/* interface RootState {
  cash: {
    cash: number;
  };
  user: {
    user: Array<string>
  }
} */

export default function Sprint() {
/*   const dispatch = useDispatch();
  const cash = useSelector((state: RootState) => state.cash.cash);
  const users = useSelector((state: RootState) => state.user.user);

  console.log(users);

  function addCash() {
    dispatch(addMoney());
  }

  function getCash() {
    dispatch(getMoney(5));
  }

  function addUser() {
    dispatch(addName());
  }

  function getUser() {
    dispatch(getName());
  } */

  return (

      <SprintDifficulty/>

/*     <div>
      <h1>{cash}</h1>
      <button onClick={addCash}>+</button>
      <button onClick={getCash}>-</button>
      <button onClick={addUser}>Добавить</button>
      <button onClick={getUser}>Убрать</button>
      {(users.length) ? <h1>{users[0]}</h1> : <h1>{'Пусто'}</h1>}
    </div> */
  );
}
