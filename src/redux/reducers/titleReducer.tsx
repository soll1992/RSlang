import { TITLE_CHANGE } from '../actions/consts';
import spotlight from '../../assets/img/home/spotlight.webp';

interface Action {
  type: string;
  payload: string;
}

const initialState = {
  title: (window.location.hash && localStorage.getItem('headerTitle')) || 'Главная',
};

export function titleChangeReducer(state = initialState, action: Action) {
  const body = document.querySelector('body');
  switch (String(window.location.hash).split('/')[1]) {
    case 'home':
      body.style.background = 'linear-gradient(-135deg, #4c77d5 25%, #55f07c 100%)';
      break;

    case 'textbook':
      // body.style.background = 'linear-gradient(135deg, #010004 5%, #6f93de 100%)'
      body.style.background = 'linear-gradient(-135deg, #4c77d5 25%, #ded8e9 100%)';
      break;

    case 'game-difficulty':
      body.style.background = 'linear-gradient(-135deg, #9936a7 25%, #2f1883 100%)';
      break;
    case 'game':
      body.style.background = 'linear-gradient(-135deg, #9936a7 25%, #2f1883 100%)';
      break;
    case 'statistics':
      body.style.background = `url(${spotlight}) center / cover`;
      break;

    default:
      break;
  }
  //
  switch (action.type) {
    case TITLE_CHANGE:
      return { ...state, title: action.payload };
    default:
      return state;
  }
}
