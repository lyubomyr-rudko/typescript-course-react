// import React from 'react';
import { useState } from 'react';
import usersData from '../users-data';
import { TUser } from '../users-data';
import { UsersList, UsersItem, Button, Like } from './User.styled';

interface IUserProps {
    data: {
        id: number;
        firstName: string;
        lastName: string;
    };
    indx: number;
    onDelete: (userId: TUser['id']) => void;
    onSwap: (indx: number, n: 1 | -1) => void;
    maxIndx: number;
}

const User = ({ data, indx, onDelete, onSwap, maxIndx }: IUserProps) => {
    // TODO: add delete button to each of the user
    // TODO: implement logic to delete user

    // TODO: add a Like button to each of the user
    // TODO: add a state to keep liked state - is user liked or not (true/false) - useState, default value false
    // TODO: implement logic to like user - click on the like button should change state of the user (liked/not liked
    // TODO: display hart icon if user is liked (💝)
    const [isLiked, setIsLiked] = useState<boolean>(false);

    const handleLikeToggle = () => {
        setIsLiked((prevState) => !prevState);
    };

    const handleDelete = () => {
        onDelete(data.id);
    };

    const handleMove = (n: 1 | -1) => {
        onSwap(indx, n);
    };

    return (
        <UsersItem>
            <Button disabled={indx <= 0} onClick={() => handleMove(-1)}>
                👆
            </Button>
            <Button disabled={indx >= maxIndx} onClick={() => handleMove(1)}>
                👇
            </Button>
            {isLiked && <Like>💝</Like>}
            <span>{indx + 1}.</span>
            <span>
                {data.firstName} {data.lastName}
            </span>
            <Button onClick={handleLikeToggle}>Like</Button>
            <Button onClick={handleDelete}>Delete</Button>
        </UsersItem>
    );
};

export function Users() {
    const [users, setUsers] = useState<TUser[]>(usersData);

    const handleDelete = (userId: TUser['id']) => {
        // TODO: implement function to delete user
        // TODO: create new list of users without deleted user
        // TODO: call setUsers with new list of users
        setUsers((prevState) => prevState.filter((user) => user.id !== userId));
    };

    // TODO: pass handleDelete to User component

    // TODO: Add "Move Up" and "Move Down" buttons to each of the user
    // TODO: Implement functions to move user up/down the list
    // TODO: Make sure you create new list of users, do not mutate existing list
    // TODO: Call setUsers with new list of users
    // TODO: Pass handleMoveUp and handleMoveDown to User component as props
    const handleSwap = (indx: number, n: 1 | -1) => {
        const newUsers = [...users];
        [newUsers[indx], newUsers[indx + n]] = [
            newUsers[indx + n],
            newUsers[indx],
        ];
        setUsers(newUsers);
    };

    return (
        <UsersList>
            {users.map((user, i) => (
                <User
                    data={user}
                    key={user.id}
                    indx={i}
                    onDelete={handleDelete}
                    onSwap={handleSwap}
                    maxIndx={users.length - 1}
                />
            ))}
        </UsersList>
    );
}

export default Users;
