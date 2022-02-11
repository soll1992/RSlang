import { GET_CASH, ADD_CASH } from '../actions/consts';

interface Action {
  type: string;
  payload?: any;
}

const initialState = {
  cash: 0,
};

export function cashReducer(state = initialState, action: Action) {
  switch (action.type) {
    case ADD_CASH:
      return { ...state, cash: +(state.cash + action.payload) };
    case GET_CASH:
      return { ...state, cash: state.cash - action.payload };
    default:
      return state;
  }
}
