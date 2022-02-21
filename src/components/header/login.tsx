import * as React from 'react';
import { FC, useRef, useState, useEffect } from 'react';

type Props = {
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
  hiddenOverlay: () => void;
  setIsSignUp: React.Dispatch<React.SetStateAction<boolean>>;
};

const Login: FC<Props> = (props) => {
  const emailInput = useRef(null);
  const passwordInput = useRef(null);

  const loginUser = (user: { email: string; password: string }) => {
    return fetch('https://react-rslang-group.herokuapp.com/signin', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then((rawResponse) => rawResponse.json())
      .then((content) => addDataUsers(content))
      .then(() => props.setIsSignUp(true))
      .then(() => props.setIsSignUp(false))
      .catch((err) => console.log('Error loginUser', err));
  };

  const addDataUsers = (content: { token: string; userId: string }) => {
    const email = emailInput.current;
    const password = passwordInput.current;
    props.userData.setValue({ token: content.token, id: content.userId });

    email.value = '';
    password.value = '';
    props.hiddenOverlay();
  };

  const createDataUsers = () => {
    const email = emailInput.current;
    const password = passwordInput.current;
    if (email.value && password.value.length >= 8) {
      loginUser({ email: email.value, password: password.value });
    }
  };
  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.value) {
      e.currentTarget.classList.add('active');
      e.currentTarget.classList.remove('error');
    } else {
      e.currentTarget.classList.remove('active');
    }
  };

  return (
    <div className="login-container__login">
      <div className="login-wrap-inputs">
        <input
          required
          minLength={4}
          pattern="^[a-z0-9._%+-]{3,15}@[a-z]{4,50}\.[a-z]{2,4}$"
          ref={emailInput}
          className="login-email input"
          onChange={(e) => handleChangeInput(e)}
          type="text"
          name="login-login"
          id="login-login"
        />
        <label
          className="login-email label"
          htmlFor="login-login"
          // className={emailInput.current.value ? "login-email input active" : "login-email input"}
        >
          Почта
        </label>
      </div>
      <div className="login-wrap-inputs">
        <input
          onChange={(e) => handleChangeInput(e)}
          required
          minLength={8}
          ref={passwordInput}
          className="login-password input"
          type="password"
          name="login-password"
          id="login-password"
        />
        <label className="login-password label" htmlFor="login-password">
          Пароль
        </label>
      </div>

      <button onClick={() => createDataUsers()} className="login-submit btn-2 login">
        Войти
      </button>
    </div>
  );
};

export default Login;
