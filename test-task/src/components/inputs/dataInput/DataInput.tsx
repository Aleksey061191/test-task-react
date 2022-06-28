import React, { ChangeEvent, useState } from 'react';
import cl from './DataInput.module.scss';

interface IPropsParam {
  date: string;
  setDate: React.Dispatch<React.SetStateAction<string>>;
}

function DataInput({ date, setDate }: IPropsParam): JSX.Element {
  const [dateDirty, setDateDirty] = useState(false);

  const blurHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      setDateDirty(false);
    } else {
      setDateDirty(true);
    }
  };

  const valueHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };

  return (
    <label className={cl.item} htmlFor={'user'}>
      <p className={cl.p}>Выберите дату рождения</p>
      {dateDirty && <div className={cl.error}>Поле не может быть пустым</div>}
      <input
        type={'date'}
        name={'data'}
        value={date}
        onBlur={blurHandler}
        onChange={valueHandler}
      />
    </label>
  );
}

export default DataInput;
