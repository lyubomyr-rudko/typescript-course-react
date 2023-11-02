import { useDeferredValue, useEffect, useState } from "react";

// Пояснення
// useDeferredValue - це хук, який обгортає властивість/стан значення та отримує максимальний час відстрочки.
//  Цей спосіб дозволяє повідомити React, що компоненти, що залежать від цього значення, можуть бути відображені пізніше.
// іншими словами він повертатиме попереднє значення, доки не буде більше термінових оновлень для завершення та відображення дерева з оновленим значенням.

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

interface IUserProps {
  data: TUser;
}

interface ISlowListProps {
  text: string;
  data: TUser[];
}

const User = (props: IUserProps) => {
  const { data } = props;
  return (
    <>
      <table>
        <tbody>
          <tr>
            {data.firstName} {data.lastName}
          </tr>
          <tr>{data.gender}</tr>
          <tr>{data.email}</tr>
          <tr>{data.birthDate}</tr>
        </tbody>
      </table>
    </>
  );
};

const SlowList = (props: ISlowListProps) => {
  const { data, text } = props;
  const filteredUsersByFirstName: TUser[] = [];
  if (text !== "") {
    data.forEach((user) => {
      if (user.firstName.toLowerCase().startsWith(text.toLowerCase())) {
        for (let i = 0; i < 150; i++) {
          filteredUsersByFirstName.push(user);
        }
      }
    });
  }
  return (
    <>
      {filteredUsersByFirstName.map((user, index) => (
        <User data={user} key={index} />
      ))}
    </>
  );
};

export function UseDeferredValue() {
  const [usersList, setUsersList] = useState<TUser[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const deferredSearchValue = useDeferredValue(searchValue);

  const fetchUsers = async () => {
    const response = await fetch("http://localhost:3004/users");
    const data = await response.json();
    setUsersList(data);
  };

  useEffect(() => {
    async function loadUsers() {
      try {
        await fetchUsers();
      } catch (e) {
        console.error(e);
        alert("something go wrong");
      }
    }
    loadUsers();
  }, []);
  return (
    <>
      <input
        type="text"
        placeholder="...search"
        onChange={(e) => setSearchValue(e.target.value)}
        value={searchValue}
      />
      <SlowList text={deferredSearchValue} data={usersList} />
    </>
  );
}
