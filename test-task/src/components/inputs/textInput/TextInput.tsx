import React, { ChangeEvent, useState } from 'react';
import cl from './TextInput.module.scss';

interface IPropsParam {
  nameI: string;
  setNameI: React.Dispatch<React.SetStateAction<string>>;
}

function TextInput({ nameI, setNameI }: IPropsParam): JSX.Element {
  const [nameError, setNameError] = useState('Поле не может быть пустым');
  const [nameDirty, setNamelDirty] = useState(false);

  const blurHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) {
      setNameError('Поле не может быть пустым');
    }
    setNamelDirty(true);
  };

  const valueHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNameI(e.target.value.toLocaleUpperCase());
    const usernameRegex = /^(([a-zA-Z]{3,30} )*[a-zA-Z]{3,30})?$/;
    const arr = e.target.value.split(' ');
    if (!usernameRegex.test(e.target.value) || arr.length !== 2) {
      setNameError(
        `“Имя Фамилия” может состоять только из 2-х слов (имя и фамилия) латинского алфавита
        Минимальная длина каждого слова 3 символа, максимальная 30. Между словами может быть только 1 пробел.`
      );
    } else {
      setNameError('');
    }
  };

  return (
    <label className={cl.item} htmlFor={'user'}>
      <p className={cl.p}>Введите Имя и Фамилию</p>
      {nameDirty && nameError && <div className={cl.error}>{nameError}</div>}
      <input
        type={'text'}
        name={'user'}
        value={nameI}
        onBlur={blurHandler}
        onChange={valueHandler}
        placeholder={'Имя Фамилия'}
        autoComplete="off"
      />
    </label>
  );
}

export default TextInput;
