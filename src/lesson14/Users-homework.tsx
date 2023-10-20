import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import {
  AddNewUserForm,
  Button,
  FormFieldWrapper,
  FormWrapper,
  HairType,
  HeaderWrapper,
  InfoWrapper,
  Legend,
  Loading,
  Table,
  TableFieldWrapper,
} from "./Users-homework.styled";

const userHairOptions = ["Blond", "Black", "Brown", "Chestnut", "Auburn"];
const tableHeaders = ["Name", "Gender", "Email", "Birthdate", "Hair color", "Navigate"];
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
  index: number;
  usersListLength: number;
  setNewOrderOfUsers: (id: number, number: 1 | -1) => void;
}
interface IFormProps {
  newUser: TUser;
  handleFormSubmit: (e: FormEvent<HTMLFormElement>) => void;
  handleNewUserChangeInfo: (e: ChangeEvent<HTMLInputElement>) => void;
  handleNewUserChangeHairColor: (e: ChangeEvent<HTMLSelectElement>) => void;
  handleNewUserChangeGender: (e: ChangeEvent<HTMLInputElement>) => void;
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
// 7. Form submit button of the form component should be disabled if form is invalid ++
// 8. Show error message for invalid fields ++

const Form = (props: IFormProps) => {
  const {
    newUser,
    handleFormSubmit,
    handleNewUserChangeInfo,
    handleNewUserChangeHairColor,
    handleNewUserChangeGender,
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
  const formInvalid = formFields.some((field) => field === "");

  const checkUserEmail = (email: string) => {
    const doubleDots = email.match(/[.]{2,}/g);
    const startWithDot = email.match(/^[.]/);
    const nameAbuse = email.match(/^abuse[@]/);
    const namePostmaster = email.match(/^postmaster[@]/);
    const correctLength = email.match(/^.{1,30}[@]\w{2,9}[.]\w{2,9}$/);
    const specialSymbols = email.match(/[&=+<>,_'-\s]/g);
    if (doubleDots) return true;
    else if (startWithDot) return true;
    else if (nameAbuse) return true;
    else if (namePostmaster) return true;
    else if (!correctLength) return true;
    else if (specialSymbols) return true;
    else return false;
  };
  const emailInvalid = checkUserEmail(newUser.email);
  return (
    <AddNewUserForm action="" onSubmit={handleFormSubmit}>
      <FormFieldWrapper>
        <Legend>First Name</Legend>
        <input
          type="text"
          onChange={handleNewUserChangeInfo}
          name="firstName"
          value={newUser.firstName}
          required
          placeholder="First Name"
        />
      </FormFieldWrapper>
      <FormFieldWrapper>
        <Legend>Last Name</Legend>
        <input
          type="text"
          onChange={handleNewUserChangeInfo}
          name="lastName"
          value={newUser.lastName}
          required
          placeholder="Last Name"
        />
      </FormFieldWrapper>
      <FormFieldWrapper>
        <Legend>Color of hair</Legend>
        <select onChange={handleNewUserChangeHairColor} value={newUser.hair.color}>
          <option value="" disabled defaultChecked>
            Please choose hair color
          </option>
          {userHairOptions.map((color) => (
            <option key={color} value={color}>
              {color}
            </option>
          ))}
        </select>
      </FormFieldWrapper>
      <FormFieldWrapper>
        <Legend>Birthdate</Legend>
        <input
          type="date"
          onChange={handleNewUserChangeInfo}
          value={newUser.birthDate}
          name="birthDate"
          required
        />
      </FormFieldWrapper>
      <FormFieldWrapper>
        <Legend>Email</Legend>
        <input
          style={{ backgroundColor: emailInvalid ? "pink" : "white" }}
          type="email"
          onChange={handleNewUserChangeInfo}
          value={newUser.email}
          name="email"
          required
          placeholder="Email"
        />
        <div style={{ marginLeft: 10 }}>Email{emailInvalid ? " incorrect" : " correct"}</div>
      </FormFieldWrapper>
      <FormFieldWrapper>
        <Legend>Is female?</Legend>
        <div style={{ display: "flex" }}>
          <input
            type="checkbox"
            onChange={handleNewUserChangeGender}
            value={newUser.gender}
            name="gender"
            checked={newUser.gender === "female"}
          />
          <div style={{ color: "black", marginLeft: 5 }}>{newUser.gender}</div>
        </div>
      </FormFieldWrapper>
      <div style={{ textAlign: "center" }}>
        <Button type="submit" disabled={emailInvalid || formInvalid}>
          Submit
        </Button>
        <Button type="button" onClick={() => setNewUser(null)}>
          Cancel
        </Button>
      </div>
    </AddNewUserForm>
  );
};

const User = (props: IUserProps) => {
  const { data, usersListLength, index, setNewOrderOfUsers } = props;
  return (
    <>
      <TableFieldWrapper>
        <InfoWrapper>
          <li>
            {data.firstName} {data.lastName}
          </li>
        </InfoWrapper>
        <InfoWrapper>
          <li>{data.gender}</li>
        </InfoWrapper>
        <InfoWrapper>
          <li>{data.email}</li>
        </InfoWrapper>
        <InfoWrapper>
          <li>{data.birthDate}</li>
        </InfoWrapper>
        <InfoWrapper>
          <HairType color={data.hair.color}></HairType>
        </InfoWrapper>
        <InfoWrapper>
          <Button disabled={index <= 0} onClick={() => setNewOrderOfUsers(data.position, -1)}>
            Up
          </Button>
          <Button
            disabled={index >= usersListLength}
            onClick={() => setNewOrderOfUsers(data.position, 1)}
          >
            Down
          </Button>
        </InfoWrapper>
      </TableFieldWrapper>
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
    setNewUser({ ...emptyUser, position: usersList.length + 1, id: usersList.length + 1 });
  };
  async function setNewOrderOfUsers(position: number, number: -1 | 1) {
    const user = usersList.find((user) => user.position === position);
    if (!user) return null;
    const user2 = usersList.find((user) => user.position === position + number);
    if (!user2) return null;
    try {
      setIsLoading(true);
      await fetch(`http://localhost:3004/users/${user.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          position: user2.position,
        }),
      });
      await fetch(`http://localhost:3004/users/${user2.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          position: user.position,
        }),
      });
      fetchUsers();
      await later(200);
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
      fetchUsers();
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
  const handleNewUserChangeHairColor = (e: ChangeEvent<HTMLSelectElement>) => {
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
  const handleNewUserChangeGender = (e: ChangeEvent<HTMLInputElement>) => {
    if (!newUser) {
      return;
    }
    const value = e.target.checked ? "female" : "male";
    setNewUser({ ...newUser, [e.target.name]: value });
  };

  function compare(a: number | string, b: number | string): number {
    if (a < b) {
      return -1;
    }
    if (a > b) {
      return 1;
    }
    return 0;
  }
  console.log(usersList);
  return (
    <>
      {isLoading ? (
        <Loading>Loading</Loading>
      ) : (
        <>
          {newUser && (
            <FormWrapper>
              <Form
                newUser={newUser}
                handleFormSubmit={handleFormSubmit}
                handleNewUserChangeInfo={handleNewUserChangeInfo}
                handleNewUserChangeHairColor={handleNewUserChangeHairColor}
                handleNewUserChangeGender={handleNewUserChangeGender}
                setNewUser={setNewUser}
              />
            </FormWrapper>
          )}
          <Table>
            <TableFieldWrapper>
              <Button onClick={addNewUser} disabled={newUser !== null}>
                Add new User
              </Button>
            </TableFieldWrapper>
            <TableFieldWrapper>
              {tableHeaders.map((header) => (
                <HeaderWrapper key={header}>{header}</HeaderWrapper>
              ))}
            </TableFieldWrapper>
            {usersList
              .sort((a, b) => compare(a.position, b.position))
              .map((user, index) => (
                <User
                  data={user}
                  key={user.position}
                  setNewOrderOfUsers={setNewOrderOfUsers}
                  usersListLength={usersList.length - 1}
                  index={index}
                />
              ))}
          </Table>
        </>
      )}
    </>
  );
}

export default Users;
