import React, { useState } from "react";
import usersData from "../users-data";
import { TUser } from "../users-data";

interface IUserProps {
  data: {
    firstName: string;
    lastName: string;
    id: number;
  };
  index: number;
  usersLength: number;
  handleDelete(id: number): void;
  handleSwapPosition(index: number, number: 1 | -1): void;
}

const User = (props: IUserProps) => {
  const { data, index, usersLength, handleDelete, handleSwapPosition } = props;
  const [isLiked, setIsLiked] = useState<boolean>(false);

  const handleLike = () => {
    setIsLiked((prev) => !prev);
  };
  return (
    <li style={{ display: "flex", alignItems: "center", margin: 10 }}>
      <span>
        {data.firstName} {data.lastName}
      </span>
      <button onClick={() => handleDelete(data.id)}>Delete</button>
      <button onClick={handleLike}>{isLiked ? "💝" : "Like"}</button>
      <div style={{ display: "flex", flexDirection: "column", margin: 10 }}>
        <button disabled={index <= 0} onClick={() => handleSwapPosition(index, -1)}>
          Up
        </button>
        <button disabled={index >= usersLength} onClick={() => handleSwapPosition(index, 1)}>
          Down
        </button>
      </div>
    </li>
  );
};

export function Users() {
  const [users, setUsers] = React.useState<TUser[]>(usersData);

  const handleDelete = (id: number) => {
    const newListOfUsers = users.filter((user) => user.id !== id);
    setUsers(newListOfUsers);
  };

  const handleSwapPosition = (index: number, number: -1 | 1) => {
    const upgradedUsers = [...users];
    upgradedUsers[index] = users[index + number];
    upgradedUsers[index + number] = users[index];
    setUsers(upgradedUsers);
  };

  return (
    <ul>
      {users.map((user, index) => (
        <User
          data={user}
          key={user.id}
          handleDelete={handleDelete}
          handleSwapPosition={handleSwapPosition}
          usersLength={users.length - 1}
          index={index}
        />
      ))}
    </ul>
  );
}

export default Users;
