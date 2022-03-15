import * as React from 'react';
import { FC, useRef } from 'react';

type Props = {
  setIsSignUp: React.Dispatch<React.SetStateAction<boolean>>;
};

const SugnUp: FC<Props> = (props: Props) => {
  const nameInput = useRef<HTMLInputElement | null>(null);
  const emailInput = useRef<HTMLInputElement | null>(null);
  const passwordInput = useRef<HTMLInputElement | null>(null);

  const userCreatedError = (rawResponse: Response, status: number) => {
    if (status === 417) window.alert('Такой пользователь уже существует');
    if (status === 422) window.alert('Непредвиденная ошибка, пожалуйста повторите попытку');
    return rawResponse;
  };

  const createUser = (user: { email: string; password: string }) => {
    const name = nameInput.current;
    const email = emailInput.current;
    const password = passwordInput.current;
    return fetch('https://react-rslang-group.herokuapp.com/users', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then((rawResponse) => userCreatedError(rawResponse, rawResponse.status))
      .then((rawResponse) => rawResponse.json())
      .then(() => props.setIsSignUp(false))
      .then(() => {
        name.value = '';
        email.value = '';
        password.value = '';
        name.disabled = false;
        email.disabled = false;
        password.disabled = false;
      })
      .catch((err) => console.log('Error createUser', err));
  };

  const createDataUsers = () => {
    const name = nameInput.current;
    const email = emailInput.current;
    const password = passwordInput.current;
    name.classList.remove('error');
    email.classList.remove('error');
    password.classList.remove('error');
    if (name.value && email.value && password.value.length >= 8) {
      name.disabled = true;
      email.disabled = true;
      password.disabled = true;
      createUser({ email: email.value, password: password.value })
        .then(() => {
          name.disabled = false;
          email.disabled = false;
          password.disabled = false;
        })
        .catch((err) => console.log('Error createUser', err));
    } else {
      if (!name.value) name.classList.add('error');
      if (!email.value) email.classList.add('error');
      if (!password.value) password.classList.add('error');
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
    <div className="login-container__signup">
      <div className="login-wrap-inputs">
        <input
          required
          minLength={4}
          maxLength={15}
          pattern="^[\sA-Za-zА-Яа-яЁё0-9]+$"
          ref={nameInput}
          className="login-login input"
          type="text"
          name="login-login"
          id="login-login"
          onChange={(e) => handleChangeInput(e)}
        />
        <label className="login-login label" htmlFor="login-login">
          Имя
        </label>
      </div>
      <div className="login-wrap-inputs">
        <input
          required
          minLength={4}
          pattern="^[a-z0-9._%+-]{3,15}@[a-z]{3,50}\.[a-z]{2,4}$"
          ref={emailInput}
          className="login-email input"
          type="email"
          name="login-email"
          id="login-email"
          onChange={(e) => handleChangeInput(e)}
        />
        <label className="login-email label" htmlFor="login-email">
          Почта
        </label>
      </div>
      <div className="login-wrap-inputs">
        <input
          required
          minLength={8}
          ref={passwordInput}
          className="login-password input"
          type="password"
          name="login-password"
          id="login-password"
          onChange={(e) => handleChangeInput(e)}
        />
        <label className="login-password label" htmlFor="login-password">
          Пароль
        </label>
      </div>
      <button onClick={() => createDataUsers()} className="login-submit btn-2 signup">
        Зарегистрироваться
      </button>
    </div>
  );
};

export default SugnUp;
