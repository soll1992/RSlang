import React, { FC, useEffect, useState } from 'react';
import Router from './router';

type UserData = {
  token: string;
  id: string;
};
type Props = {
  userData: {
    value: UserData;
    setValue: React.Dispatch<UserData>;
  };
};
const Main: FC<Props> = (props) => {
  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    if (props.userData.value.token === '') {
      setIsLogin(false);
    } else {
      setIsLogin(true);
    }
  }, [props.userData.value]);
  return (
    <>
      {isLogin ? (
        <main id="main" className="main">
          <Router />
        </main>
      ) : (
        <main id="main" className="main">
          <div className="main container">
            <Router />
          </div>
        </main>
      )}
    </>
  );
};

export default Main;
