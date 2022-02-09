import * as React from 'react';
import { FC, useRef, useState, useEffect } from 'react';

type Props = {
};



const SugnUp: FC<Props> = (props: Props) => {
  const nameInput = useRef(null)
  const emailInput = useRef(null)
  const passwordInput = useRef(null)

  const createUser = (user: { 'email': string, 'password': string }) => {
    return fetch('https://react-rslang-group.herokuapp.com/users', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then((rawResponse) => rawResponse.json())
      .catch((err) => console.log('Error createUser', err));
  };

  const createDataUsers = () => {
    const name = nameInput.current
    const email = emailInput.current
    const password = passwordInput.current
    if (name.value && email.value && password.value.length >= 8) {
      createUser({ "email": email.value, "password": password.value })
        .then(() => {
          name.value = ''
          email.value = ''
          password.value = ''
        }).catch((err) => console.log('Error createUser', err));
    }
  }

  return (
    <div className='login-container__signup'>
      <div className='login-wrap-inputs'>
        <label className='login-login label' htmlFor="login-login">Имя</label>
        <input minLength={4} ref={nameInput} className='login-login input' type="text" name="login-login" id="login-login" />
      </div>
      <div className='login-wrap-inputs'>
        <label className='login-email label' htmlFor="login-email">Почта</label>
        <input minLength={4} ref={emailInput} className='login-email input' type="email" name="login-email" id="login-email" />
      </div>
      <div className='login-wrap-inputs'>
        <label className='login-password label' htmlFor="login-password">Пароль</label>
        <input minLength={8} ref={passwordInput} className='login-password input' type="password" name="login-password" id="login-password" />
      </div>
      <button onClick={() => createDataUsers()} className='login-submit signup'>Зарегистрироваться</button>
    </div>
  );
};

export default SugnUp;
