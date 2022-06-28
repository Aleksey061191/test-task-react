import React, { FormEvent, useCallback, useEffect, useState } from 'react';
import { postInfo } from '../service/service';
import DataInput from './inputs/dataInput/DataInput';
import EmailInput from './inputs/emailInput/EmailInput';
import MessangeInput from './inputs/messangeInput/MessangeInput';
import PhoneInput from './inputs/phoneInput/PhoneInput';
import TextInput from './inputs/textInput/TextInput';

function Form(): JSX.Element {
  const [nameInp, setNameInp] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [isValide, setIsValide] = useState(false);
  const [show, setShow] = useState(false);

  const checkValide = useCallback(() => {
    const regPhone = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/;
    const regName = /^(([a-zA-Z]{3,30} )*[a-zA-Z]{3,30})?$/;
    const regEmail =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // eslint-disable-line
    if (
      regPhone.test(phone) &&
      regName.test(nameInp) &&
      message.length > 10 &&
      regEmail.test(email) &&
      date
    ) {
      setIsValide(true);
    } else {
      setIsValide(false);
    }
  }, [nameInp, phone, message, email, date]);

  useEffect(() => {
    checkValide();
  }, [checkValide]);

  const resetForm = () => {
    setNameInp('');
    setPhone('');
    setMessage('');
    setEmail('');
    setDate('');
    setIsValide(false);
  };

  const handlerSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsValide(false);
    const isSubmit = await postInfo({ nameInp, phone, message, email, date });
    if (isSubmit) {
      setShow(true);
      resetForm();
      setTimeout(() => setShow(false), 2000);
    }
  };
  return (
    <>
      <form onSubmit={handlerSubmit}>
        <TextInput nameI={nameInp} setNameI={setNameInp} />
        <EmailInput email={email} setEmail={setEmail} />
        <PhoneInput phone={phone} setPhone={setPhone} />
        <DataInput date={date} setDate={setDate} />
        <MessangeInput message={message} setMessage={setMessage} />
        <button type="submit" disabled={!isValide}>
          Отправить
        </button>
      </form>
      {show && <h2>Данные успешно отправлены!!!</h2>}
    </>
  );
}

export default Form;
