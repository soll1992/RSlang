import * as React from 'react';
import { FC, useRef } from 'react';

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
  const emailInput = useRef<HTMLInputElement | null>(null);
  const passwordInput = useRef<HTMLInputElement | null>(null);

  const userUndefined = (rawResponse: Response, status: number) => {
    if (status === 403) window.alert('Не правильный пароль');
    if (status === 404) window.alert('Такого пользователя не существует');
    return rawResponse;
  };

  const addDataUsers = (content: { token: string; userId: string }) => {
    const email = emailInput.current;
    const password = passwordInput.current;
    props.userData.setValue({ token: content.token, id: content.userId });

    email.value = '';
    password.value = '';
    props.hiddenOverlay();
  };

  const loginUser = (user: { email: string; password: string }) => {
    return fetch('https://react-rslang-group.herokuapp.com/signin', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then((rawResponse) => userUndefined(rawResponse, rawResponse.status))
      .then((rawResponse) => rawResponse.json())
      .then((content) => addDataUsers(content))
      .then(() => props.setIsSignUp(true))
      .then(() => props.setIsSignUp(false))
      .catch((err) => console.log('Error loginUser', err));
  };

  const createDataUsers = () => {
    const email = emailInput.current;
    const password = passwordInput.current;
    if (email.value && password.value.length >= 8) {
      loginUser({ email: email.value, password: password.value });
    }
  };

  function keysHandler(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.code === 'Enter') {
      createDataUsers();
    }
  }

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.value) {
      e.currentTarget.classList.add('active');
      e.currentTarget.classList.remove('error');
    } else {
      e.currentTarget.classList.remove('active');
    }
  };

  return (
    <div onKeyUp={keysHandler} className="login-container__login">
      <div className="login-wrap-inputs">
        <input
          required
          minLength={4}
          pattern="^[a-z0-9._%+-]{3,15}@[a-z]{4,50}\.[a-z]{2,4}$"
          ref={emailInput}
          className="login-email input"
          onChange={(e) => handleChangeInput(e)}
          type="text"
          name="login-email"
          id="login-login"
        />
        <label className="login-email label" htmlFor="login-login">
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
