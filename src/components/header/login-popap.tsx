import * as React from 'react';
import { FC, useState } from 'react';
import Login from './login';
import SignUp from './signup';

type Props = {
  loginIsOpen: boolean;
  userData: {
    value: {
      token: string;
      id: string;
    };
    setValue: React.Dispatch<
      React.SetStateAction<{
        token: string;
        id: string;
      }>
    >;
  };
};

const LoginPopup: FC<Props> = (props: Props) => {
  const [isSignUp, setIsSignUp] = useState(false);

  const showSignUp = () => {
    setIsSignUp(true);
  };
  const hiddenSignUp = () => {
    setIsSignUp(false);
  };

  return (
    <div className={props.loginIsOpen ? 'login-popup-wrap active' : 'login-popup-wrap'}>
      <div className="login-header-buttons">
        <button
          onClick={hiddenSignUp}
          className={!isSignUp ? 'login-header-button login active' : 'login-header-button login'}
        >
          Вход
        </button>
        <button
          onClick={showSignUp}
          className={isSignUp ? 'login-header-button signup active' : 'login-header-button signup'}
        >
          Регистрация
        </button>
      </div>
      <div className="login-popup-container">
        <div className="login-popup-container-wrap">{!isSignUp ? <Login userData={props.userData} /> : <SignUp />}</div>
      </div>
    </div>
  );
};

export default LoginPopup;
