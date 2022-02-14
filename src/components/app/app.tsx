import React, { Fragment } from 'react';
import Router from './router';
import Header from '../header/header';
import Footer from '../footer/footer';
import ParticlesApp from './particles'

const App = () => {
  return (
    <Fragment>
      <Header />
      <main id="main" className="main">
        <Router />
      </main>
      <ParticlesApp />

      <Footer />
    </Fragment>
  );
};

export default App;
