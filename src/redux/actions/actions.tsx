import { GET_CASH, ADD_CASH, GET_USER, ADD_USER, CHANGE_DIFFICULTY, CHANGE_PAGE } from './consts';

export function addMoney() {
  return { type: ADD_CASH, payload: 5 };
}

export function getMoney(payload: number) {
  return { type: GET_CASH, payload };
}

export function addName() {
  return { type: ADD_USER, payload: ['Anton'] };
}

export function getName() {
  return { type: GET_USER };
}

export function changeDifficulty(payload: number) {
  return { type: CHANGE_DIFFICULTY, payload };
}

export function changePage(payload: number) {
  return { type: CHANGE_PAGE, payload };
}
