import { GET_USER, ADD_USER } from '../actions/consts'

interface Initial {
  user: Array<number>
}

const initialState: Initial = {
  user: [],
};

interface Action {
  type: string;
  payload?: any;
}

export function userReducer(state = initialState, action: Action) {
  switch (action.type) {
    case ADD_USER:
      return { ...state, user: [...state.user, ...action.payload] };
    case GET_USER:
      return { ...state, user: state.user.slice(0, state.user.length - 1) };
    default:
      return state;
  }
}
