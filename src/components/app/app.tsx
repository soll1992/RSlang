import React, { Fragment, useState } from 'react';
import Main from './main';
import Header from '../header/header';
import Footer from '../footer/footer';
import ParticlesApp from './particles-default';

type UserData = {
  token: string;
  id: string;
};

const App = () => {
  const [userData, setUserData] = useState<UserData>(() => {
    const saved = localStorage.getItem('userData');
    const initialValue = JSON.parse(saved) as { token: string; id: string } | undefined;
    return initialValue || { token: '', id: '' };
  });

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
