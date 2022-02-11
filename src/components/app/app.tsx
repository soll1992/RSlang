import React, { Fragment } from 'react';
import Router from './router';
import Header from '../header/header';
import Footer from '../footer/footer';

const App = () => {
  return (
    <Fragment>
      <Header />
      <main id="main" className="main">
        <Router />
      </main>
      <Footer />
    </Fragment>
  );
};

export default App;
