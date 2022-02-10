import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { cashReducer } from '../reducers/cashReducer';
import { userReducer } from '../reducers/userReducer';
import { difficultyReducer } from '../reducers/difficultyReducer';
import { pageReducer } from '../reducers/pageReducer';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
  cash: cashReducer,
  user: userReducer,
  gameDifficulty: difficultyReducer,
  gameWordPage: pageReducer,
});

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
