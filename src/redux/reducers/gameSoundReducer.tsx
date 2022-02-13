import { MUTE_GAME, UNMUTE_GAME } from '../actions/consts';

interface Action {
  type: string;
}

const initialState = {
    muteGame: false,
};

export function muteGameReducer(state = initialState, action: Action) {
  switch (action.type) {
    case MUTE_GAME:
      return { ...state, muteGame: true };
    case UNMUTE_GAME:
      return { ...state, muteGame: false };
    default:
      return state;
  }
}
