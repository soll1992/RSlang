import { CHANGE_PAGE } from '../actions/consts';

interface Action {
  type: string;
  payload: number;
}

const initialState = {
  gameWordPage: localStorage.getItem('page') || 0,
};

export function pageReducer(state = initialState, action: Action) {
  switch (action.type) {
    case CHANGE_PAGE:
      return { ...state, gameWordPage: action.payload };
    default:
      return state;
  }
}
