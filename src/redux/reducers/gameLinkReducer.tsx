import { FROM_MENU, FROM_TEXTBOOK } from '../actions/consts';

interface Action {
  type: string;
}

const initialState = {
  from: localStorage.getItem('from') || 'Menu',
};

export function gameLinkReducer(state = initialState, action: Action) {
  switch (action.type) {
    case FROM_MENU:
      return { ...state, from: 'Menu' };
    case FROM_TEXTBOOK:
      return { ...state, from: 'Textbook' };
    default:
      return state;
  }
}
