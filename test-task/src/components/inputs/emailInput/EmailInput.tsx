import React, { ChangeEvent, useState } from 'react';
import cl from './EmailInput.module.scss';

interface IPropsParam {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
}

function EmailInput({ email, setEmail }: IPropsParam): JSX.Element {
  const [emailError, setEmailError] = useState('E-mail не может быть пустым');
  const [emailDirty, setEmailDirty] = useState(false);

  const blurHandler = () => {
    setEmailDirty(true);
  };

  const emailHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // eslint-disable-line
    if (!re.test(String(e.target.value).toLocaleLowerCase())) {
      setEmailError('Не корректный E-mail');
    } else {
      setEmailError('');
    }
  };

  return (
    <label className={cl.item} htmlFor="email">
      <p className={cl.p}>Введите ваш E-mail</p>
      {emailDirty && emailError && <div className={cl.error}>{emailError}</div>}
      <input
        type="text"
        name="email"
        value={email}
        onChange={emailHandler}
        onBlur={blurHandler}
        placeholder="E-mail"
      />
    </label>
  );
}

export default EmailInput;
