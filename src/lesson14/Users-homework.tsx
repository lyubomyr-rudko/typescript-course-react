// import usersData from "../users-data";
import { useEffect, useState } from 'react';
import { TUser } from '../users-data';
import {
  Container,
  HeadText,
  HeaderList,
  HeaderSublist,
  UnorderedList,
  List,
  HairColor,
  LoadingContainer,
  Loading,
  Button,
  ModalContainer,
  UserForm,
  Label,
  Input,
  Select,
} from './Users-homework.styled';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

interface IUserProps {
  data: TUser;
  onMoveUp: (id: number) => void;
  onMoveDown: (id: number) => void;
}

// # Users list and form with api

// + 1. Update User list component to fetch data from api
// + 2. Add loading state to User list component (show loading message while list is loading)
// + 3. Add buttons to move user up/down the list, store position in db json (add position field to each of the users)
// + 4. Add form component to create new user shown as modal. Show form on click on the button "Add new user"
// 5. Form to create user needs to have the following inputs
// +   1. User first name (text input)
// +   2. User last name (text input)
// +   3. User hair color (select input)
// +   4. User birthDate (datetime input)
// +   5. User is female (checkbox input)
// +   6. User email (email input)
// 6. Add form validation to the form component
//    1. User first name is required
//    2. User last name is required
//    3. User email is required and should be valid email
//    4. User birthDate is required and should be valid date
// 7. Form submit button of the form component should be disabled if form is invalid
// 8. Show error message for invalid fields

const User = (props: IUserProps) => {
  const { data, onMoveUp, onMoveDown } = props;
  const birthDate = new Intl.DateTimeFormat('en-GB', {
    dateStyle: 'full',
    timeStyle: 'long',
    timeZone: 'Australia/Sydney',
  })
    .format(new Date(data.birthDate))
    .split(' ');

  function handleMoveUp() {
    onMoveUp(data.id);
  }

  function handleMoveDown() {
    onMoveDown(data.id);
  }

  return (
    <>
      <List>{data.id}</List>
      <List>
        {data.firstName} {data.lastName}
      </List>
      <List>{data.gender}</List>
      <List>
        <HairColor hairColor={data.hair.color} />
      </List>
      <List>
        {birthDate[1]} {birthDate[2]}, {birthDate[3]}
      </List>
      <List>{data.phone}</List>
      <Button onClick={handleMoveUp}>⬆️</Button>
      <Button onClick={handleMoveDown}>⬇️</Button>
    </>
  );
};

function ModalAddUser() {
  const mailRegx =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  let userSchema = yup.object({
    firstName: yup.string().required('First name is required field'),
    lastName: yup.string().required('Last name is required field'),
    hairColor: yup
      .string<'black' | 'yellow' | 'brown' | 'red'>()
      .required('Hair color is required field'),
    birthDate: yup.date().required('Birthdate is required field'),
    gender: yup.boolean(),
    email: yup
      .string()
      .required('Email is required field')
      .matches(mailRegx, 'Enter valid email'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(userSchema) });

  type newUser = {
    gender?: boolean | undefined;
    firstName: string;
    lastName: string;
    hairColor: NonNullable<'black' | 'yellow' | 'brown' | 'red' | undefined>;
    birthDate: Date;
    email: string;
  };

  function onSubmit(userData: newUser): void {
    const newUser = {
      ...userData,
      hair: {
        color: userData.hairColor,
      },
      birthDate:
        typeof userData.birthDate === 'object'
          ? `${userData.birthDate.getFullYear()}-${
              userData.birthDate.getMonth() + 1
            }-${userData.birthDate.getDate()}`
          : null,
      gender: userData.gender ? 'female' : 'male',
      phone: '+3800000000',
    };
    fetch(`http://localhost:3000/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    });
    location.reload();
  }
  return (
    <ModalContainer>
      <UserForm onSubmit={handleSubmit(onSubmit)}>
        <Label>
          First name*
          <Input {...register('firstName')} />
          <p>{errors.firstName?.message}</p>
        </Label>
        <Label>
          Last name*
          <Input {...register('lastName')} />
          <p>{errors.lastName?.message}</p>
        </Label>
        <Label>
          Hair color
          <Select {...register('hairColor')}>
            <option value='' selected disabled hidden>
              Choose here
            </option>
            <option value={'black'}>black</option>
            <option value={'yellow'}>yellow</option>
            <option value={'brown'}>brown</option>
            <option value={'red'}>red</option>
          </Select>
          <p>{errors.hairColor?.message}</p>
        </Label>
        <Label>
          Birth Date
          <Input type='date' {...register('birthDate')} />
          <p>{errors.birthDate?.message}</p>
        </Label>
        <Label>
          Is female
          <Input type='checkbox' {...register('gender')} />
        </Label>
        <Label>
          Email
          <Input type='email' {...register('email')} />
          <p>{errors.email?.message}</p>
        </Label>
        <button>Add user</button>
      </UserForm>
    </ModalContainer>
  );
}

export function Users() {
  const [usersData, setUsersData] = useState<TUser[]>([]);
  const fetchUsers = async function () {
    const request = await fetch('http://localhost:3000/users');
    const data = await request.json();
    setUsersData(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  function handleMoveUp(user: number) {
    if (user === 1) {
      return;
    }
    const result = [...usersData];
    const moved = result.filter((el) => el.id === user);
    result.splice(
      usersData.findIndex((el) => el.id === user),
      1
    );
    result.splice(usersData.findIndex((el) => el.id === user) - 1, 0, moved[0]);
    let number = 1;
    result.map((el) => {
      el.id = number;
      number++;
    });
    function fetchUp() {
      result.map((user) => {
        fetch(`http://localhost:3000/users/${user.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(user),
        });
      });
      fetchUsers();
    }

    fetchUp();
  }

  const handleMoveDown = (user: number) => {
    if (user === usersData.length) {
      return;
    }
    const result = [...usersData];
    const moved = usersData.filter((el) => el.id === user);
    result.splice(
      usersData.findIndex((el) => el.id === user),
      1
    );
    result.splice(usersData.findIndex((el) => el.id === user) + 1, 0, moved[0]);
    let number = 1;
    result.map((el) => {
      el.id = number;
      number++;
    });
    function fetchDown() {
      result.map((user) => {
        fetch(`http://localhost:3000/users/${user.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(user),
        });
      });
      fetchUsers();
    }
    fetchDown();
  };

  const [modal, setModal] = useState(false);
  const click = () => {
    setModal(!modal);
  };

  return (
    <>
      {!usersData.length ? (
        <LoadingContainer>
          <Loading>Loading...</Loading>
        </LoadingContainer>
      ) : (
        <Container>
          <HeadText>Users</HeadText>
          <button onClick={click}>Add new user</button>
          {modal ? <ModalAddUser /> : null}
          <HeaderList>
            <HeaderSublist>Id</HeaderSublist>
            <HeaderSublist>User Name</HeaderSublist>
            <HeaderSublist>Gender</HeaderSublist>
            <HeaderSublist>Hair Color</HeaderSublist>
            <HeaderSublist>Birth Date</HeaderSublist>
            <HeaderSublist>Phone Number</HeaderSublist>
            <HeaderSublist></HeaderSublist>
          </HeaderList>
          {usersData.map((user) => (
            <UnorderedList>
              <User
                data={user}
                key={user.id}
                onMoveUp={handleMoveUp}
                onMoveDown={handleMoveDown}
              />
            </UnorderedList>
          ))}
        </Container>
      )}
    </>
  );
}

export default Users;
