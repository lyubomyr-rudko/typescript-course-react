import React from "react";
import usersData from "../users-data";
import { TUser } from "../users-data";

interface IUserProps {
  data: {
    id: number;
    firstName: string;
    lastName: string;
  };
  onDelete: (id: number) => void;
  onMoveUp: (id: number) => void;
  onMoveDown: (id: number) => void;
}

const User = (props: IUserProps) => {
  const { data, onDelete, onMoveUp, onMoveDown } = props;
  const [like, setLike] = React.useState<boolean>(false)
  function handleDelete() {
    onDelete(data.id);
  }
 
  function handleLike() {
    setLike(!like);
  }

  function handleMoveUp() {
    onMoveUp(data.id);
  }

  function handleMoveDown() {
    onMoveDown(data.id);
  }

  return (
    <li>
      {like && <span>💝</span>}
      <span>
        {data.firstName} {data.lastName}
      </span>
      <button onClick={handleLike}>Like</button>
      <button onClick={handleDelete}>Delete</button>
      <button onClick={handleMoveUp}>⬆️</button>
      <button onClick={handleMoveDown}>⬇️</button>
    </li>
  );
};

export function Users() {
  const [users, setUsers] = React.useState<TUser[]>(usersData);

  const handleDelete = (user: number) => {
    setUsers(users.filter(el => el.id !== user));
  };

  const handleMoveUp = (user: number) => {
    const result = [...users];
    const moved = users.filter(el => el.id === user);
    result.splice(users.findIndex(el => el.id === user), 1);
    result.splice(users.findIndex(el => el.id === user) - 1, 0, moved[0]);
    setUsers(result);
  }

  const handleMoveDown = (user: number) => {
    const result = [...users];
    const moved = users.filter(el => el.id === user);
    result.splice(users.findIndex(el => el.id === user), 1);
    result.splice(users.findIndex(el => el.id === user) + 1, 0, moved[0]);
    setUsers(result);
  }


  return (
    <ul>
      {users.map((user) => (
        <User data={user} key={user.id} onDelete={handleDelete} onMoveUp={handleMoveUp} onMoveDown={handleMoveDown} />
      ))}
    </ul>
  );
}

export default Users;
