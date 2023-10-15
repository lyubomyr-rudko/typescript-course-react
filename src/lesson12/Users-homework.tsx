import React from "react";
import { useState } from "react";
import usersData from "../users-data";
import { TUser } from "../users-data";

interface IUserProps {
  data: TUser;
  onDelete: (user: TUser) => void;
  onMoveUp: (user: TUser) => void;
  onMoveDown: (user: TUser) => void;
}

const User = (props: IUserProps) => {
  const { data, onDelete, onMoveUp, onMoveDown } = props;

  // TODO: add delete button to each of the user
  // TODO: implement logic to delete user

  // TODO: add a Like button to each of the user
  // TODO: add a state to keep liked state - is user liked or not (true/false) - useState, default value false
  // TODO: implement logic to like user - click on the like button should change state of the user (liked/not liked
  // TODO: display hart icon if user is liked (💝)
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const handleLike = () => {
    setIsLiked(!isLiked); 
  };

  const handleDelete = () => {
    onDelete(data);
  };

  return (
    <li>
      <span>
        {data.firstName} {data.lastName}
      </span>
      <button onClick={handleDelete}>Delete</button>
      <button onClick={handleLike}>
        {isLiked ? "💝 Liked" : "Like"}
      </button>
      <button onClick={() => onMoveUp(data)}>Move Up</button>
      <button onClick={() => onMoveDown(data)}>Move Down</button>
    </li>
  );
};

export function Users() {
  const [users, setUsers] = React.useState<TUser[]>(usersData);

  const handleDelete = (user: TUser) => {
    console.log("deleting", user);
    // TODO: implement function to delete user
    // TODO: create new list of users without deleted user
    // TODO: call setUsers with new list of users
    const updatedUsers = users.filter((u) => u.id !== user.id);
    setUsers(updatedUsers);
  };
  // TODO: pass handleDelete to User component

  // TODO: Add "Move Up" and "Move Down" buttons to each of the user
  // TODO: Implement functions to move user up/down the list
  // TODO: Make sure you create new list of users, do not mutate existing list
  // TODO: Call setUsers with new list of users
  // TODO: Pass handleMoveUp and handleMoveDown to User component as props
  const handleMoveUp = (user: TUser) => {
    const index = users.findIndex((u) => u.id === user.id);
    if (index > 0) {
      const updatedUsers = [...users];
      [updatedUsers[index], updatedUsers[index - 1]] = [
        updatedUsers[index - 1],
        updatedUsers[index],
      ];
      setUsers(updatedUsers);
    }
  };

  const handleMoveDown = (user: TUser) => {
    const index = users.findIndex((u) => u.id === user.id);
    if (index < users.length - 1) {
      const updatedUsers = [...users];
      [updatedUsers[index], updatedUsers[index + 1]] = [
        updatedUsers[index + 1],
        updatedUsers[index],
      ];
      setUsers(updatedUsers);
    }
  };

  return (
    <ul>
      {users.map((user) => (
        <User
          data={user}
          key={user.id}
          onDelete={handleDelete}
          onMoveUp={handleMoveUp}
          onMoveDown={handleMoveDown}
        />
      ))}
    </ul>
  );
}
