import { TUser } from "../users-data";
import {Container, Header, Table, TableRow, TableHeader, TableCell, HairColorIcon, Form, Label} from "./Users-homework.styled";
import React, { useEffect, useState } from "react";

interface IUserProps {
  data: TUser;
  onMoveUp: (id: number) => void;
  onMoveDown: (id: number) => void;
}

// # Users list and form with api

// 1. Update User list component to fetch data from api
// 2. Add loading state to User list component (show loading message while list is loading)
// 3. Add buttons to move user up/down the list, store position in db json (add position field to each of the users)
// 4. Add form component to create new user shown as modal. Show form on click on the button "Add new user"
// 5. Form to create user needs to have the following inputs
//    1. User first name (text input)
//    2. User last name (text input)
//    3. User hair color (select input)
//    4. User birthDate (datetime input)
//    5. User is female (checkbox input)
//    6. User email (email input)
// 6. Add form validation to the form component
//    1. User first name is required
//    2. User last name is required
//    3. User email is required and should be valid email
//    4. User birthDate is required and should be valid date
// 7. Form submit button of the form component should be disabled if form is invalid
// 8. Show error message for invalid fields

const User = (props: IUserProps) => {
  const { data, onMoveUp, onMoveDown } = props;

  return (
    <TableRow>
      <TableCell>{data.id}</TableCell>
      <TableCell>{data.firstName} {data.lastName}</TableCell>
      <TableCell>{data.gender}</TableCell>
      <TableCell><HairColorIcon color={data.hair.color.toLocaleLowerCase()}></HairColorIcon></TableCell>
      <TableCell>{data.birthDate}</TableCell>
      <TableCell>{data.email}</TableCell>
      <TableCell>
        <button onClick={() => onMoveUp(data.id)}>Move Up</button>
        <button onClick={() => onMoveDown(data.id)}>Move Down</button>
      </TableCell>
      
    </TableRow>
  );
};

interface NewUserFormProps {
  onAddUser: (user: NewUser) => void;
}

interface NewUser {
  firstName: string;
  lastName: string;
  hair: {
    color: string
  };
  birthDate: string;
  isFemale: boolean;
  email: string;
}

const NewUserForm = (props: NewUserFormProps) => {
  const [user, setUser] = useState<NewUser>({
    firstName: "",
    lastName: "",
    hair:{
      color: "",
    },
    birthDate: "",
    isFemale: false,
    email: "",
  });

  const setUserProperty = <K extends keyof NewUser>(properuty:K, value:NewUser[K]):void=>{
    setUser((user)=>{
      return {
        ...user,
        [properuty]:value
      }
    })
  }

  const handleSubmit = () => {
      props.onAddUser(user);
  };

  return (
    <Form>
      <div>
        <Label htmlFor="firstName">First Name</Label>
        <input
          type="text"
          id="firstName"
          value={user.firstName}
          onChange={(e) => { setUserProperty('firstName', e.target.value) }}
          required
        />
      </div>

      <div>
        <Label htmlFor="lastName">Last Name</Label>
        <input
          type="text"
          id="lastName"
          value={user.lastName}
          onChange={(e)=>{setUserProperty('lastName',e.target.value)}}
          required
        />
      </div>

      <div>
        <Label htmlFor="hairColor">Hair Color</Label>
        <select id="hairColor" value={user.hair.color} onChange={(e)=>{setUserProperty('hair',{color: e.target.value})}}>
          <option value="">Select</option>
          <option value="Auburn">Auburn</option>
          <option value="Black">Black</option>
          <option value="Blond">Blond</option>
          <option value="Chestnut">Chestnut</option>
          <option value="Brown">Brown</option>
        </select>
      </div>

      <div>
        <Label htmlFor="birthDate">Birth Date</Label>
        <input
          type="date"
          id="birthDate"
          value={user.birthDate}
          onChange={(e) => { setUserProperty('birthDate', e.target.value.toString().split('T')[0]) }}
          required
        />
      </div>

      <div>
        <Label htmlFor="isFemale">Is Female</Label>
        <input
          type="checkbox"
          id="isFemale"
        />
      </div>

      <div>
        <Label htmlFor="email">Email</Label>
        <input
          type="email"
          id="email"
          pattern=".+@gmail\.com"
          value={user.email}
          onChange={(e) => { setUserProperty('email', e.target.value) }}
          required
        />
      </div>

      <button type="submit" onClick={handleSubmit}>
        Add User
      </button>
    </Form>
  );
};

export function Users() {
  const [usersList, setUsersList] = React.useState<TUser[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [newUserForm, setNewUserForm] = useState<boolean>(false);
  const [show, setShow] = useState(false)

  const handleAddUser = async (data: NewUser)=>{
    setNewUserForm(false)
    setIsLoading(true);
    await addUser(data);
    setIsLoading(false);
  }
  
  useEffect(() => {
    console.log("fetching users list");
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
      const response = await fetch("http://localhost:3004/users");
      const data = await response.json();

      setUsersList(data);
  };

  useEffect(() => {
    setIsLoading(true);
    fetch('http://localhost:3004/users')
      .then(response => response.json())
      .then(data => {
        setUsersList(data);
        setIsLoading(false);
      });
  }, []);

   const addUser = async (data: NewUser)=>{
    await fetch(`http://localhost:3008/users/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    await fetchUsers()
  }

  
  const handleMoveUp = async (id: number) => {
    const dataCurrent = await fetch(`http://localhost:3004/users/${id}`);
    const currentUser = await dataCurrent.json();

    if (!currentUser) {
      return;
    }

    const dataPrev = await fetch(`http://localhost:3004/users/${id - 1}`);
    const prevUser = await dataPrev.json();
    
    if (!prevUser) {
      return;
    }

    const tempPosition = currentUser.position;
    currentUser.position = prevUser.position;
    prevUser.position = tempPosition;

    await fetch(`http://localhost:3004/users/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(prevUser),
    });
    await fetch(`http://localhost:3004/users/${id - 1}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(currentUser),
    });
    fetchUsers();
  };

  const handleMoveDown = async (id: number) => {
    const dataCurrent = await fetch(`http://localhost:3004/users/${id}`);
    const currentUser = await dataCurrent.json();

    if (!currentUser) {
      return;
    }

    const dataNext = await fetch(`http://localhost:3004/users/${id + 1}`);
    const nextUser = await dataNext.json();

    if (!nextUser) {
      return;
    }

    const tempPosition = currentUser.position;
    currentUser.position = nextUser.position;
    nextUser.position = tempPosition;
    
    await fetch(`http://localhost:3004/users/${id + 1}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(currentUser),
    });
    await fetch(`http://localhost:3004/users/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(nextUser),
    });
    fetchUsers();
  };


  return (
    <Container>
      <Header>Users</Header>
      <button onClick={() => setShow(!show)}>Add new user</button>
      {show ? <NewUserForm onAddUser={handleAddUser} /> : null}
      <Table>
        <thead>
          <TableRow>
            <TableHeader>Position</TableHeader>
            <TableHeader>User Name</TableHeader>
            <TableHeader>Gender</TableHeader>
            <TableHeader>Hair Color</TableHeader>
            <TableHeader>Birth Date</TableHeader>
            <TableHeader>Email</TableHeader>
            <TableHeader></TableHeader>
          </TableRow>
        </thead>
        <tbody>
           {isLoading ? <tr><td>Loading...</td></tr> : usersList.map((user) => (
            <User data={user} key={user.id} onMoveUp={handleMoveUp} onMoveDown={handleMoveDown}/>
          ))}
        </tbody>
      </Table>
    </Container>

  );
}

export default Users;
