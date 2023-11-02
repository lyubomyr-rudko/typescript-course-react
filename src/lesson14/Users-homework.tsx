import {
  ChangeEvent,
  FormEvent,
  memo,
  useCallback,
  useDeferredValue,
  useEffect,
  useRef,
  useState,
} from "react";
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
  TBody,
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
interface ISlowListProps {
  text: string;
  data: TUser[];
}
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
  handleBirthDateChange: (newValue: string) => void;
  userBirthDate: string;
  userLastName: string;
  handleLastNameChange: (newValue: string) => void;
}
interface ILastNameInputsProps {
  value: string;
  handleLastNameChange: (newValue: string) => void;
}
interface IBirthDateInputsProps {
  value: string;
  handleBirthDateChange: (newValue: string) => void;
}

const LastNameInput = memo<ILastNameInputsProps>(
  (props) => {
    const { value: lastName, handleLastNameChange } = props;
    console.log("LastNameInput render", lastName);
    return (
      <input
        type="text"
        value={lastName}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleLastNameChange(e.target.value)}
        name="birthDate"
        placeholder="Last Name"
        required
      />
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.value === nextProps.value &&
      prevProps.handleLastNameChange === nextProps.handleLastNameChange
    );
  }
);

const BirthDateInput = memo<IBirthDateInputsProps>(
  (props) => {
    const { value: birthDate, handleBirthDateChange } = props;
    console.log("BirthDateInput render", birthDate);
    return (
      <input
        type="date"
        value={birthDate}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleBirthDateChange(e.target.value)}
        name="birthDate"
        required
      />
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.value === nextProps.value &&
      prevProps.handleBirthDateChange === nextProps.handleBirthDateChange
    );
  }
);

const Form = (props: IFormProps) => {
  const {
    newUser,
    handleFormSubmit,
    handleNewUserChangeInfo,
    handleNewUserChangeHairColor,
    handleNewUserChangeGender,
    setNewUser,
    handleBirthDateChange,
    userBirthDate,
    userLastName,
    handleLastNameChange,
  } = props;

  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    ref?.current?.focus();
  }, []);

  const formFields = [
    newUser?.firstName,
    userLastName,
    newUser?.gender,
    newUser?.email,
    newUser?.hair?.color,
    userBirthDate,
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
          ref={ref}
        />
      </FormFieldWrapper>
      <FormFieldWrapper>
        <Legend>Last Name</Legend>
        <LastNameInput value={userLastName} handleLastNameChange={handleLastNameChange} />
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
        <BirthDateInput value={userBirthDate} handleBirthDateChange={handleBirthDateChange} />
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
  const style = useMaleOlder30(data);
  return (
    <>
      <TableFieldWrapper {...style}>
        <InfoWrapper>
          {data.firstName} {data.lastName}
        </InfoWrapper>
        <InfoWrapper>{data.gender}</InfoWrapper>
        <InfoWrapper>{data.email}</InfoWrapper>
        <InfoWrapper>{data.birthDate}</InfoWrapper>
        <HairType color={data.hair.color}></HairType>
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

const SlowList = (props: ISlowListProps) => {
  const { data, text } = props;
  const filteredUsersByFirstName: TUser[] = [];
  if (text !== "") {
    data.forEach((user) => {
      if (user.firstName.toLowerCase().startsWith(text.toLowerCase())) {
        for (let i = 0; i < 100; i++) {
          filteredUsersByFirstName.push(user);
        }
      }
    });
  }
  function setNewOrderOfUsers() {
    console.log(filteredUsersByFirstName);
  }
  return (
    <>
      {filteredUsersByFirstName.map((user, index) => (
        <User
          data={user}
          usersListLength={filteredUsersByFirstName.length - 1}
          index={index}
          setNewOrderOfUsers={setNewOrderOfUsers}
          key={index}
        />
      ))}
    </>
  );
};

type TUseUserWithBlackHair = (user: TUser) => { style: { backgroundColor: string } };
const useMaleOlder30: TUseUserWithBlackHair = (user) => {
  const now = new Date().getTime();
  const userAge = Date.parse(user.birthDate);
  const correctAgeOfUser = Math.floor((now - userAge) / (1000 * 60 * 60 * 24 * 30 * 12));
  const backGroundColor =
    correctAgeOfUser > 30 && user.gender === "male"
      ? { backgroundColor: "gold" }
      : { backgroundColor: "transparent" };
  return { style: backGroundColor };
};

export function Users() {
  const [usersList, setUsersList] = useState<TUser[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [newUser, setNewUser] = useState<TUser | null>(null);
  const [searchValue, setSearchValue] = useState<string>("");
  const [userBirthDate, setUserBirthDate] = useState<string>("");
  const [userLastName, setUserLastName] = useState<string>("");
  const countOfLoadings = useRef<number>(0);
  // 1.Під час пошуку через SearchValue , useDeferredValue почне відображати value input не чекаючи завершення виконання обчислення, що гарно для швидкодії компонента.
  const deferredSearchValue = useDeferredValue(searchValue);
  // 2.Перед визовом функції перевіряється, чи викликалась  функція раніше:
  // якщо не викликалась, то функція викликається, і результат її виконання зберігається;
  // якщо викликалась, то використовується збереженний результат.
  // useCallback приймає в якості аргументів встроенний колбек і массив залежностей.
  //  Повертає мемоізованну версію колбека, котрий зміниться тільки, якщо зміняться значення однієї із залежностей
  // 3. useRef поверне змінний об'єкт рефу, властивість "сurrent" якого ініціалізується переданим аргументом ( initialValue ).
  //  Повернутий об'єкт буде зберігатись протягом всього часу життя компонента. По суті, useRef — це “коробка”, що може містити змінне значення у власній властивості
  // Я виконав у двух варіантах , 1) Рахувати кількість загрузок 2) при кожному відкритті форми ставити фокус на First Name input.
  // 4. CustomHook "useMaleOlder30" Змінює backgroundColor колонки у юзера якому за 30 років і він чоловік;
  const handleBirthDateChange = useCallback(
    (newValue: string): void => setUserBirthDate(newValue),
    [setUserBirthDate]
  );
  const handleLastNameChange = useCallback(
    (newValue: string): void => setUserLastName(newValue),
    [setUserLastName]
  );

  function setLoadingAndCount() {
    setIsLoading(true);
    countOfLoadings.current++;
  }

  const later = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  const fetchUsers = async () => {
    const response = await fetch("http://localhost:3004/users");
    const data = await response.json();
    setUsersList(data);
  };

  useEffect(() => {
    async function loadUsers() {
      try {
        setLoadingAndCount();
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
      setLoadingAndCount();
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
      setLoadingAndCount();
      await fetch(`http://localhost:3004/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...newUser, birthDate: userBirthDate, lastName: userLastName }),
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

  return (
    <>
      {isLoading ? (
        <Loading>Loading № {countOfLoadings.current}</Loading>
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
                handleBirthDateChange={handleBirthDateChange}
                setNewUser={setNewUser}
                userBirthDate={userBirthDate}
                userLastName={userLastName}
                handleLastNameChange={handleLastNameChange}
              />
            </FormWrapper>
          )}
          <Table>
            <caption>
              <Button onClick={addNewUser} disabled={newUser !== null}>
                Add new User
              </Button>
              <input
                type="text"
                placeholder="...search"
                onChange={(e) => setSearchValue(e.target.value)}
                value={searchValue}
              />
            </caption>
            <TBody>
              <TableFieldWrapper>
                {tableHeaders.map((header) => (
                  <HeaderWrapper key={header}>{header}</HeaderWrapper>
                ))}
              </TableFieldWrapper>
              <SlowList text={deferredSearchValue} data={usersList} />
              {searchValue === "" &&
                usersList
                  .sort((a, b) => compare(a.position, b.position))
                  .map((user, index) => (
                    <User
                      data={user}
                      key={user.position + index}
                      setNewOrderOfUsers={setNewOrderOfUsers}
                      usersListLength={usersList.length - 1}
                      index={index}
                    />
                  ))}
            </TBody>
          </Table>
        </>
      )}
    </>
  );
}

export default Users;
