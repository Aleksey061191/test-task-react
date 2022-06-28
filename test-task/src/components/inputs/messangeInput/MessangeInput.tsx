import React, { ChangeEvent, useState } from 'react';
import cl from './MessangeInput.module.scss';

interface IPropsParam {
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
}

function MessangeInput({ message, setMessage }: IPropsParam): JSX.Element {
  const [messageDirty, setMessageDirty] = useState(false);
  const [messageError, setMessageError] = useState('Поле не может быть пустым');

  const blurHandler = () => {
    setMessageDirty(true);
  };

  const valueHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
    if (e.target.value.length < 10) {
      setMessageError(`минимальная длинна сообщения 10 символов`);
    } else {
      setMessageError('');
    }
  };

  return (
    <label className={cl.item} htmlFor={'user'}>
      <p className={cl.p}>Сообщение</p>
      {messageDirty && messageError && <div className={cl.error}>{messageError}</div>}
      <input
        className={cl.messageInput}
        type={'text'}
        name={'message'}
        value={message}
        onBlur={blurHandler}
        onChange={valueHandler}
        minLength={10}
        maxLength={300}
      />
    </label>
  );
}

export default MessangeInput;
