import { CHANGE_SERIA } from '../actions/consts';

interface Action {
  type: string;
  payload: number;
}

const initialState = {
  seria: 0,
};

export function changeSeriaReducer(state = initialState, action: Action) {
  switch (action.type) {
    case CHANGE_SERIA:
      return { ...state, seria: action.payload };
    default:
      return state;
  }
}
