import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import { Provider } from 'react-redux';
import favicon from './assets/img/favicon.png';
import './assets/scss/style.scss';

// favicon скачан с сайта <a href="https://www.flaticon.com/ru/free-icons/" title="английский иконки">Английский иконки от Amethyst prime - Flaticon</a>
const addFavicon = document.querySelector('link[rel="icon"], link[rel="shortcut icon"]') as HTMLLinkElement;
addFavicon.setAttribute('href', String(favicon));

import { store } from './redux/store/store';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
