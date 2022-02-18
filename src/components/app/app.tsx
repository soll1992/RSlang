import React, { Fragment, useEffect, useState } from 'react';
import Router from './router';
import Header from '../header/header';
import Footer from '../footer/footer';
import ParticlesApp from './particles'



const App = () => {

  // const [headerTitle, setHeaderTitle] = useState<string>(() => {
  //   const saved = localStorage.getItem('headerTitle');
  //   const initialValue = window.location.hash && saved !== 'undefined' ? saved : undefined;
  //   return initialValue || 'Главная';
  // });

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
