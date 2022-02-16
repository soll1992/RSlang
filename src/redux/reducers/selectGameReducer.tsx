import { SELECT_AUDIOCHALLENGE, SELECT_SPRINT } from '../actions/consts';

interface Action {
  type: string;
  payload: string;
}

const initialState = {
  selectedGame: localStorage.getItem('game') || 'audiochallenge',
};

export function selectGameReducer(state = initialState, action: Action) {
  switch (action.type) {
    case SELECT_SPRINT:
      return { ...state, selectedGame: action.payload };
    case SELECT_AUDIOCHALLENGE:
      return { ...state, selectedGame: action.payload };
    default:
      return state;
  }
}
