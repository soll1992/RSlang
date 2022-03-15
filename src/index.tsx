import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import favicon from './assets/img/favicon.png';
import App from './components/app/app';
import { store } from './redux/store/store';
import './assets/scss/style.scss';

// favicon скачан с сайта <a href="https://www.flaticon.com/ru/free-icons/" title="английский иконки">Английский иконки от Amethyst prime - Flaticon</a>
const addFavicon = document.querySelector('link[rel="icon"], link[rel="shortcut icon"]');
addFavicon.setAttribute('href', String(favicon));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
