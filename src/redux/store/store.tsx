import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { difficultyReducer } from '../reducers/difficultyReducer';
import { pageReducer } from '../reducers/pageReducer';
import { selectGameReducer } from '../reducers/selectGameReducer'
import { muteGameReducer } from '../reducers/gameSoundReducer'; 
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
  gameDifficulty: difficultyReducer,
  gameWordPage: pageReducer,
  selectedGame: selectGameReducer,
  muteGame: muteGameReducer,
});

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
