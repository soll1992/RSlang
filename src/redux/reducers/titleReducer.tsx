import { TITLE_CHANGE } from '../actions/consts';

interface Action {
  type: string;
  payload: string;
}

const initialState = {
  title: localStorage.getItem('headerTitle') || 'Главная',
};

export function titleChangeReducer(state = initialState, action: Action) {
  switch (action.type) {
    case TITLE_CHANGE:
      return { ...state, title: action.payload };
    default:
      return state;
  }
}
