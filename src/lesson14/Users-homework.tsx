import { useEffect, useState, useCallback, useContext } from "react";
import { TUser } from "../users-data";

import { Modal, UsersTable, ModalContext, Form, ClassicButton } from './Components';
import { Container, Title, Loader } from './Users-homework.styled'

// # Users list and form with api

// 1. + Update User list component to fetch data from api
// 2. + Add loading state to User list component (show loading message while list is loading)
// 3. + Add buttons to move user up/down the list, store position in db json (add position field to each of the users)
// 4. Add form component to create new user shown as modal. Show form on click on the button "Add new user"
// 5. + Form to create user needs to have the following inputs
//    + 1. User first name (text input)
//    + 2. User last name (text input)
//    + 3. User hair color (select input)
//    + 4. User birthDate (datetime input)
//    + 5. User is female (checkbox input)
//   +  6. User email (email input)
// 6. Add form validation to the form component
//    + 1. User first name is required
//    + 2. User last name is required
//    + 3. User email is required and should be valid email
//   +  4. User birthDate is required and should be valid date
// + 7. Form submit button of the form component should be disabled if form is invalid
// + 8. Show error message for invalid fields

export function Users() {
  const { handleOpenModal } = useContext(ModalContext);

  const [usersList, setUsersList] = useState<TUser[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const tableHead = ['Move buttons', 'User Name', 'Gender', 'Hair Color', 'Birth date', 'Phone number'];

  const getAllUsers = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3004/users');
      const data: TUser[] = await response.json();
      const sortedByPosition = data.sort((a, b) => a.position - b.position);
      setLoading(false);
      setUsersList(sortedByPosition);
    } catch (error) {
      console.log('error fetch all users', error)
    }
  }, []);

  const updateUserPosition = async (id: number, position: number) => {
    try {
      const response = await fetch(`http://localhost:3004/users/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          position: position,
        }),
      });
      if (!response.ok) throw new Error("Error update User Position");
    } catch (error) {
      console.log('error', error);
    }
  };

  const handleMove = async (id: number, position: number, index: number, move: 'up' | 'down') => {
    if (move === 'up') {
      const prevItemId = usersList[index - 1].id;
      await updateUserPosition(id, position - 1);
      await updateUserPosition(prevItemId, position);
    } else {
      const prevItemId = usersList[index + 1].id;
      await updateUserPosition(id, position + 1);
      await updateUserPosition(prevItemId, position);
    }
    getAllUsers();
  }

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <Container>
      <Title>Users</Title>
      {
        loading
          ? <Loader>Loading ...</Loader>
          : <UsersTable
            data={usersList}
            tableHead={tableHead}
            maxPosition={usersList.length}
            handleMove={handleMove}
          />
      }
      <Modal>
        <Form maxPosition={usersList.length} handleGetAllUsers={getAllUsers} />
      </Modal>
      <ClassicButton
        style={{ position: 'absolute', top: "40px", right: "0" }}
        type='button'
        onClick={() => handleOpenModal()}
      >
        Add new user
      </ClassicButton>
    </Container>
  );
}

export default Users;
