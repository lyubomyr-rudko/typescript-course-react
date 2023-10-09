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
  maxIndex: number;
  handleDelete: (userId: number) => void;
  handleMoveUp: (index: number, n: 1 | -1) => void;
}

const User = (props: IUserProps) => {
  const { data, index, maxIndex, handleDelete, handleMoveUp } = props;

  const [isLike, setIsLike] = useState<boolean>(false);

  const handleToggleLike = () => {
    setIsLike(prev => !prev);
  }

  // TODO:+add delete button to each of the user
  // TODO: +implement logic to delete user

  // TODO: add a Like button to each of the user
  // TODO: add a state to keep liked state - is user liked or not (true/false) - useState, default value false
  // TODO: implement logic to like user - click on the like button should change state of the user (liked/not liked
  // TODO: display hart icon if user is liked (💝)

  return (
    <li>
      <button disabled={index <= 0} onClick={() => handleMoveUp(index, -1)}>Up</button>
      <button disabled={index >= maxIndex} onClick={() => handleMoveUp(index, 1)}>Down</button>
      <span>
        {data.firstName} {data.lastName}
        {isLike && <span>💝</span>}
      </span>
      <button onClick={() => handleToggleLike()}>Like</button>
      <button onClick={() => handleDelete(data?.id)}>delete</button>
    </li>
  );
};

export function Users() {
  const [users, setUsers] = React.useState<TUser[]>(usersData);

  const handleDelete = (userId: number) => {
    // console.log("deleting", userId);
    setUsers((prev => prev.filter(item => item.id !== userId)));
    // TODO: +implement function to delete user
    // TODO: +create new list of users without deleted user
    // TODO: +call setUsers with new list of users
  };
  // console.log(handleDelete, setUsers);

  // TODO: +pass handleDelete to User component

  // TODO: +Add "Move Up" and "Move Down" buttons to each of the user
  // TODO: +Implement functions to move user up/down the list
  // TODO: +Make sure you create new list of users, do not mutate existing list
  // TODO: +Call setUsers with new list of users
  // TODO: +Pass handleMoveUp and handleMoveDown to User component as props
  const handleMoveUp = (index: number, n: 1 | -1) => {
    const newUsers = [...users];

    [newUsers[index], newUsers[index + n]] = [newUsers[index + n], newUsers[index]];

    setUsers(newUsers)
  };

  return (
    <ul>
      {users.map((user, index) => (
        <User
          data={user}
          index={index}
          key={user.id}
          maxIndex={users.length - 1}
          handleDelete={handleDelete}
          handleMoveUp={handleMoveUp}
        />
      ))}
    </ul>
  );
}

export default Users;
