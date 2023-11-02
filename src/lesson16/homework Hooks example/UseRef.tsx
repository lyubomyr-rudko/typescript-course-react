// useRef поверне змінний об'єкт рефу, властивість "сurrent" якого ініціалізується переданим аргументом ( initialValue ).
//  Повернутий об'єкт буде зберігатись протягом всього часу життя компонента. По суті, useRef — це “коробка”, що може містити змінне значення у власній властивості
// Я виконав у двух варіантах , 1) Рахувати кількість ререндерів сторінки 2) при кожному відкритті форми ставити фокус на First Name input.

import { ChangeEvent, useEffect, useRef, useState } from "react";

export function UseRef() {
  const [user, setUser] = useState({ firstName: "" });
  const ref = useRef<HTMLInputElement>(null);
  const count = useRef<number>(0);
  useEffect(() => {
    ref?.current?.focus();
  }, []);

  const handleNewUserChangeInfo = (e: ChangeEvent<HTMLInputElement>) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  count.current++;
  return (
    <>
      <input
        type="text"
        onChange={handleNewUserChangeInfo}
        name="firstName"
        value={user.firstName}
        required
        placeholder="First Name"
        ref={ref}
      />
      <label>Number of Rerenders: {count.current}</label>
    </>
  );
}
