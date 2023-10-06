import React, {useState} from "react";
import usersData from "../users-data";
import { TUser } from "../users-data";
import Button from "./Button.tsx";

type TUserMoveDirection = 'up' | 'down'
interface IUserProps {
  data: {
    firstName: string;
    lastName: string;
    id: number
  };
  onDelete: (id: number) => void
  onMoveUser: (id: number, direction: TUserMoveDirection) => void,
  idx: number,
  lastIndex: number
}

const User = ({ data: { firstName, lastName, id }, idx, lastIndex, onDelete, onMoveUser }: IUserProps) => {

  // TODO: add delete button to each of the user
  // TODO: implement logic to delete user

  // TODO: add a Like button to each of the user
  // TODO: add a state to keep liked state - is user liked or not (true/false) - useState, default value false
  // TODO: implement logic to like user - click on the like button should change state of the user (liked/not liked
  // TODO: display hart icon if user is liked (💝)
  const [isLiked, setIsLiked] = useState(false)
  const onLikeToggle = () => {
    setIsLiked((prevState) => !prevState)
  }
  return (
    <li className='user-list__item'>
      <span className='user-list__name'>
        {firstName} {lastName} {isLiked && <span>💝</span>}
      </span>
      <Button text='Delete user' onClick={() => onDelete(id)}/>
      <Button text='Like' onClick={onLikeToggle}/>
      <Button text='MoveUp' disabled={idx === 0} onClick={() => onMoveUser(id, 'up')}/>
      <Button text='MoveDown' disabled={idx === lastIndex} onClick={() => onMoveUser(id, 'down')}/>
    </li>
  );
};

export function Users() {
  const [users, setUsers] = React.useState<TUser[]>(usersData);

  const handleDelete = (id: number): void => {
    // TODO: implement function to delete user
    // TODO: create new list of users without deleted user
    // TODO: call setUsers with new list of users
    const idx: number = users.findIndex((user: TUser) => user.id === id)
    const newUsersArray: TUser[] = [...users.slice(0, idx), ...users.slice(idx + 1)]
    setUsers(newUsersArray)
  };
  const onMoveUser = (id: number, direction: string): void => {
    const idx: number = users.findIndex((user: TUser) => user.id === id)
    const newUsersArray: TUser[] = [...users]
    if (direction === 'up') {
      [newUsersArray[idx], newUsersArray[idx - 1]] = [newUsersArray[idx - 1], newUsersArray[idx]]
    } else {
      [newUsersArray[idx], newUsersArray[idx + 1]] = [newUsersArray[idx + 1], newUsersArray[idx]]
    }
    setUsers(newUsersArray)
  }

  // TODO: pass handleDelete to User component

  // TODO: Add "Move Up" and "Move Down" buttons to each of the user
  // TODO: Implement functions to move user up/down the list
  // TODO: Make sure you create new list of users, do not mutate existing list
  // TODO: Call setUsers with new list of users
  // TODO: Pass handleMoveUp and handleMoveDown to User component as props

  return (
    <ul className='user-list'>
      {users.map((user: TUser, idx: number, array: TUser[]) => (
        <User data={user}
              key={user.id}
              idx={idx}
              lastIndex={array.length - 1}
              onDelete={handleDelete}
              onMoveUser={onMoveUser}
        />
      ))}
    </ul>
  );
}

export default Users;
