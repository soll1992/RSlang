import React, { Fragment } from 'react';
import Router from './router';
import Header from '../header/header';

const App = () => {
  return (
    <Fragment>
      <Header />
      <main id="main" className="main">
        <Router />
      </main>
    </Fragment>
  );
};

export default App;
