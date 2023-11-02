import { useState } from "react";
import { useLocalStorage } from "./CustomHook";

// Пояснення
// За допомогою хука useLocalStorage я дістаю вже разпарсане значення ,
// а точніше юзерів, а функція перевіряє якщо з локалсторідж повернувся null то він підгружає с сервера i дані одразу сетає в локал сторідж, а якщо не null
// то використовує що поверне нам хук.

const emptyUser = {
  id: 0,
  position: 0,
  firstName: "",
  lastName: "",
  maidenName: "",
  age: 0,
  gender: "",
  email: "",
  phone: "",
  username: "",
  password: "",
  birthDate: "",
  image: "",
  bloodGroup: "",
  height: 0,
  weight: 0,
  eyeColor: "",
  hair: {
    color: "",
    type: "",
  },
  domain: "",
  ip: "",
  address: {
    address: "",
    city: "",
    coordinates: {
      lat: 0,
      lng: 0,
    },
    postalCode: "",
    state: "",
  },
  macAddress: "",
  university: "",
  bank: {
    cardExpire: "",
    cardNumber: "",
    cardType: "",
    currency: "",
    iban: "",
  },
  company: {
    address: {
      address: "",
      city: "",
      coordinates: {
        lat: 0,
        lng: 0,
      },
      postalCode: "",
      state: "",
    },
    department: "",
    name: "",
    title: "",
  },
  ein: "",
  ssn: "",
  userAgent: "",
};
type TUser = typeof emptyUser;

export function CustomHookDemo() {
  const [usersList, setUsersList] = useState<TUser[]>([]);
  const users = useLocalStorage("users123");
  const fetchUsers = async () => {
    if (!users) {
      const response = await fetch("http://localhost:3004/users");
      const data = await response.json();
      localStorage.setItem("users123", JSON.stringify(data));
      setUsersList(data);
    } else setUsersList(users);
  };

  return (
    <>
      <button onClick={fetchUsers}>fetch Users</button>
      {usersList.map((user, index) => (
        <div key={index}>{user.lastName}</div>
      ))}
    </>
  );
}
