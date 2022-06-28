import React, { ChangeEvent, useState } from 'react';
import cl from './PhoneInput.module.scss';

interface IPropsParam {
  phone: string;
  setPhone: React.Dispatch<React.SetStateAction<string>>;
}

function PhoneInput({ phone, setPhone }: IPropsParam): JSX.Element {
  const [phoneError, setPhoneError] = useState('Поле не может быть пустым');
  const [phoneDirty, setPhoneDirty] = useState(false);

  const blurHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length < 5) {
      setPhone('');
      setPhoneError(`Поле не может быть пустым`);
    }
    setPhoneDirty(true);
  };

  const focusHandler = () => {
    if (phone.length === 0) {
      setPhone('+7 (');
    }
  };

  const PATTERN = /\D/g;

  const getInputNumbersValue = (value: string) => {
    return value.replace(PATTERN, '');
  };
  const phoneHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target;
    const inputNumbersValue = getInputNumbersValue(input.value);
    let formattedInputValue = '';
    if (!inputNumbersValue) {
      setPhone('');
    }
    if (inputNumbersValue.length >= 1) {
      formattedInputValue += `+7 (${inputNumbersValue.substring(1, 4)}`;
    }
    if (inputNumbersValue.length >= 5) {
      formattedInputValue += `) ${inputNumbersValue.substring(4, 7)}`;
    }
    if (inputNumbersValue.length >= 8) {
      formattedInputValue += `-${inputNumbersValue.substring(7, 9)}`;
    }
    if (inputNumbersValue.length >= 10) {
      formattedInputValue += `-${inputNumbersValue.substring(9, 11)}`;
    }
    setPhone(formattedInputValue);
    const re = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/;
    if (!re.test(e.target.value)) {
      setPhoneError(`Номер телефона должен состоять из 10 цифр`);
    } else {
      setPhoneError('');
    }
  };

  return (
    <label className={cl.item} htmlFor={'user'}>
      <p className={cl.p}>Введите номер телефона</p>
      {phoneDirty && phoneError && <div className={cl.error}>{phoneError}</div>}
      <input
        type={'tel'}
        name={'user'}
        value={phone}
        onFocus={focusHandler}
        onBlur={blurHandler}
        onChange={phoneHandler}
        placeholder={'+7 (___)__-__-__'}
        autoComplete="off"
        maxLength={18}
      />
    </label>
  );
}

export default PhoneInput;
