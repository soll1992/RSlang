import * as React from 'react';
import { FC, useRef, useState, useEffect } from 'react';

type Props = {
  userData: {
    value: {
      token: string;
      id: string;
    };
    setValue: React.Dispatch<React.SetStateAction<{
      token: string;
      id: string;
    }>>;
  }
};

const Login: FC<Props> = (props: Props) => {

  const emailInput = useRef(null)
  const passwordInput = useRef(null)

  const loginUser = (user: { 'email': string, 'password': string }) => {
    return fetch('https://react-rslang-group.herokuapp.com/signin', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then((rawResponse) => rawResponse.json())
      .then((content) => addDataUsers(content))
      .catch((err) => console.log('Error loginUser', err));
  };

  const addDataUsers = (content: { token: string, userId: string }) => {
    const email = emailInput.current
    const password = passwordInput.current
    props.userData.setValue({ token: content.token, id: content.userId })

    email.value = ''
    password.value = ''
  }

  const createDataUsers = () => {
    const email = emailInput.current
    const password = passwordInput.current
    if (email.value && password.value.length >= 8) {
      loginUser({ email: email.value, password: password.value })
    }
  }


  return (
    <div className='login-container__login'>
      <div className='login-wrap-inputs'>
        <label className='login-login label' htmlFor="login-login">Почта</label>
        <input minLength={4} ref={emailInput} className='login-login input' type="text" name="login-login" id="login-login" />
      </div>
      <div className='login-wrap-inputs'>
        <label className='login-password label' htmlFor="login-password">Пароль</label>
        <input minLength={8} ref={passwordInput} className='login-password input' type="password" name="login-password" id="login-password" />
      </div>
      <button onClick={() => createDataUsers()} className='login-submit login'>Войти</button>
    </div>
  );
};

export default Login;
