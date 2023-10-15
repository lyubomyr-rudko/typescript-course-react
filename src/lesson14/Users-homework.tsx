import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { TUser } from "../users-data";

const userHairOptions = ["Blond", "Black", "Brown", "Chestnut", "Auburn"];
const emptyUser = {
  id: 0,
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

interface IUserProps {
  data: TUser;
  index: number;
  usersListLength: number;
  setNewOrderOfUsers: (id: number, number: 1 | -1) => void;
}
interface IFormProps {
  newUser: TUser;
  handleFormSubmit: (e: FormEvent<HTMLFormElement>) => void;
  handleNewUserChangeInfo: (e: ChangeEvent<HTMLInputElement>) => void;
  handleChangeHairColor: (e: ChangeEvent<HTMLSelectElement>) => void;
  handleChangeGender: (e: ChangeEvent<HTMLInputElement>) => void;
  setNewUser: (user: TUser | null) => void;
}
// # Users list and form with api

// 1. Update User list component to fetch data from api ++
// 2. Add loading state to User list component (show loading message while list is loading) ++
// 3. Add buttons to move user up/down the list, store position in db json (add position field to each of the users) ++
// 4. Add form component to create new user shown as modal. Show form on click on the button "Add new user"
// 5. Form to create user needs to have the following inputs
//    1. User first name (text input) ++
//    2. User last name (text input) ++
//    3. User hair color (select input) ++
//    4. User birthDate (datetime input) ++
//    5. User is female (checkbox input) ++
//    6. User email (email input) ++
// 6. Add form validation to the form component
//    1. User first name is required ++
//    2. User last name is required ++
//    3. User email is required and should be valid email ++
//    4. User birthDate is required and should be valid date ++
// 7. Form submit button of the form component should be disabled if form is invalid
// 8. Show error message for invalid fields

const Form = (props: IFormProps) => {
  const {
    newUser,
    handleFormSubmit,
    handleNewUserChangeInfo,
    handleChangeHairColor,
    handleChangeGender,
    setNewUser,
  } = props;

  const formFields = [
    newUser?.firstName,
    newUser?.lastName,
    newUser?.gender,
    newUser?.email,
    newUser?.hair?.color,
    newUser?.birthDate,
  ];
  const formValidate = formFields.some((field) => field === "");
  return (
    <form action="" onSubmit={handleFormSubmit}>
      <input
        type="text"
        onChange={handleNewUserChangeInfo}
        name="firstName"
        value={newUser.firstName}
        required
        placeholder="First Name"
      />
      <input
        type="text"
        onChange={handleNewUserChangeInfo}
        name="lastName"
        value={newUser.lastName}
        required
        placeholder="Last Name"
      />
      <select onChange={handleChangeHairColor} value={newUser.hair.color}>
        <option value="" disabled defaultChecked>
          Please choose hair color
        </option>
        {userHairOptions.map((color) => (
          <option key={color} value={color}>
            {color}
          </option>
        ))}
      </select>
      <input
        type="date"
        onChange={handleNewUserChangeInfo}
        value={newUser.birthDate}
        name="birthDate"
        required
      />
      <input
        type="email"
        onChange={handleNewUserChangeInfo}
        value={newUser.email}
        name="email"
        required
        placeholder="Email"
      />
      <label>Is female?</label>
      <input
        type="checkbox"
        onChange={handleChangeGender}
        value={newUser.gender}
        name="gender"
        checked={newUser.gender === "female"}
      />
      <button type="submit" disabled={formValidate}>
        Submit
      </button>
      <button type="button" onClick={() => setNewUser(null)}>
        Cancel
      </button>
    </form>
  );
};

const User = (props: IUserProps) => {
  const { data, usersListLength, index, setNewOrderOfUsers } = props;
  return (
    <>
      <li>
        {data.firstName} {data.lastName}
      </li>
      <button disabled={index <= 0} onClick={() => setNewOrderOfUsers(data.id, -1)}>
        Up
      </button>
      <button disabled={index >= usersListLength} onClick={() => setNewOrderOfUsers(data.id, 1)}>
        Down
      </button>
    </>
  );
};

export function Users() {
  const [usersList, setUsersList] = useState<TUser[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [newUser, setNewUser] = useState<TUser | null>(null);
  const later = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  const fetchUsers = async () => {
    const response = await fetch("http://localhost:3004/users");
    const data = await response.json();
    setUsersList(data);
  };

  useEffect(() => {
    async function loadUsers() {
      try {
        setIsLoading(true);
        fetchUsers();
        await later(1500);
      } catch (e) {
        console.error(e);
        alert("something go wrong");
      } finally {
        setIsLoading(false);
      }
    }
    loadUsers();
  }, []);

  const addNewUser = () => {
    setNewUser({ ...emptyUser, id: usersList.length + 1 });
  };
  async function setNewOrderOfUsers(id: number, number: -1 | 1) {
    const user = usersList.find((user) => user.id === id);
    if (!user) return null;
    const user2 = usersList.find((user) => user.id === id + number);
    if (!user2) return null;
    const updatedUser = { ...user, id: id + number };
    const updatedUser2 = { ...user2, id: id };
    const filteredUsersList = usersList.filter((user) => user.id !== id && user.id !== id + number);
    const updatedUsersList = [...filteredUsersList, updatedUser, updatedUser2].sort((a, b) =>
      a.id > b.id ? 1 : -1
    );
    try {
      setIsLoading(true);
      await fetch(`http://localhost:3004/users/${id + number}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
      });
      await fetch(`http://localhost:3004/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser2),
      });
      setUsersList(updatedUsersList);
      await later(500);
    } catch (e) {
      console.error(e);
      alert("something go wrong");
    } finally {
      setIsLoading(false);
    }
  }
  async function handleFormSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!newUser) return null;
    try {
      setIsLoading(true);
      await fetch(`http://localhost:3004/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });
      setUsersList([...usersList, newUser]);
      await later(500);
    } catch (e) {
      console.error(e);
      alert("something go wrong");
    } finally {
      setIsLoading(false);
      setNewUser(null);
    }
  }
  const handleNewUserChangeInfo = (e: ChangeEvent<HTMLInputElement>) => {
    if (!newUser) {
      return;
    }
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };
  const handleChangeHairColor = (e: ChangeEvent<HTMLSelectElement>) => {
    if (!newUser) {
      return;
    }
    console.log(e.target.value);
    setNewUser({
      ...newUser,
      hair: {
        ...newUser.hair,
        color: e.target.value,
      },
    });
  };
  const handleChangeGender = (e: ChangeEvent<HTMLInputElement>) => {
    if (!newUser) {
      return;
    }
    const value = e.target.checked ? "female" : "male";
    setNewUser({ ...newUser, [e.target.name]: value });
  };
  return (
    <ul>
      {isLoading ? (
        <div>Loading</div>
      ) : (
        <>
          <div>
            {newUser ? (
              <Form
                newUser={newUser}
                handleFormSubmit={handleFormSubmit}
                handleNewUserChangeInfo={handleNewUserChangeInfo}
                handleChangeHairColor={handleChangeHairColor}
                handleChangeGender={handleChangeGender}
                setNewUser={setNewUser}
              />
            ) : (
              <div>
                <button onClick={addNewUser}>Add new User</button>
              </div>
            )}
          </div>
          <div>
            {usersList.map((user, index) => (
              <User
                data={user}
                key={user.id}
                setNewOrderOfUsers={setNewOrderOfUsers}
                usersListLength={usersList.length - 1}
                index={index}
              />
            ))}
          </div>
        </>
      )}
    </ul>
  );
}

export default Users;
