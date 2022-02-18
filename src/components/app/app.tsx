import React, { Fragment, useEffect, useState } from 'react';
import Main from './main';
import Header from '../header/header';
import Footer from '../footer/footer';
import ParticlesApp from './particles'

type UserData = {
  token: string;
  id: string;
}

const App = () => {
  const [userData, setUserData] = useState<UserData>(() => {
    const saved = localStorage.getItem('userData');
    const initialValue = JSON.parse(saved);
    return initialValue || { token: '', id: '' };
  });
  // const [headerTitle, setHeaderTitle] = useState<string>(() => {
  //   const saved = localStorage.getItem('headerTitle');
  //   const initialValue = window.location.hash && saved !== 'undefined' ? saved : undefined;
  //   return initialValue || 'Главная';
  // });

  return (
    <Fragment>
      <Header userData={{ value: userData, setValue: setUserData }} />
      <Main userData={{ value: userData, setValue: setUserData }} />
      <ParticlesApp />
      <Footer />
    </Fragment>
  );
};

export default App;
