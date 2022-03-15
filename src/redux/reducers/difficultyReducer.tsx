import { CHANGE_DIFFICULTY } from '../actions/consts';

interface Action {
  type: string;
  payload: number;
}

const initialState = {
  gameDifficulty: localStorage.getItem('difficulty') || 0,
};

export function difficultyReducer(state = initialState, action: Action) {
  switch (action.type) {
    case CHANGE_DIFFICULTY:
      return { ...state, gameDifficulty: action.payload };
    default:
      return state;
  }
}
