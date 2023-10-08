import React from "react";
import { useState } from "react";
import usersData from "../users-data";
import { TUser } from "../users-data";

interface IUserProps {
  data: {
    firstName: string;
    lastName: string;
    id:number
  };
  addLikeCalback:(id:number)=>void,
  deleteCalback:(id:number)=>void,
  up:(id:number)=>void,
  down:(id:number)=>void,
  isLiked:boolean
}

const User = (props: IUserProps) => {
  const { data, addLikeCalback, deleteCalback, isLiked, up, down } = props;


  // TODO: add delete button to each of the user
  // TODO: implement logic to delete user

  // TODO: add a Like button to each of the user
  // TODO: add a state to keep liked state - is user liked or not (true/false) - useState, default value false
  // TODO: implement logic to like user - click on the like button should change state of the user (liked/not liked
  // TODO: display hart icon if user is liked (💝)

  return (
    <li className="userRow">
      <span className="userName">
        {data.firstName} {data.lastName} {isLiked?<i>💝</i>:''}
      </span>
      <span className="firstButton"><button onClick={()=>addLikeCalback(data.id)}>Like</button></span>
      <span><button onClick={()=>deleteCalback(data.id)}>Delete</button></span>
      <span><button onClick={()=>up(data.id)}>Up</button></span>
      <span><button onClick={()=>down(data.id)}>Down</button></span>
    </li>
  );
};

export function Users() {
  const [users, setUsers] = React.useState<TUser[]>(usersData);
  const [likedUsers, setLikedUsers] = React.useState<number[]>([]);

  const handleDelete = (userId: number) => {
    console.log("deleting", userId);
    // TODO: implement function to delete user
    // TODO: create new list of users without deleted user
    // TODO: call setUsers with new list of users
    const newUsers:TUser[] = users.filter(el=>el.id !== userId)
    setUsers(newUsers);

  };
  const handleLike = (userId: number) => {
    console.log("handleLike", userId);
    const newLikes:number[]=[];
    if(likedUsers.indexOf(userId)>-1){
      newLikes.push(...likedUsers.filter(el=>el !== userId))
    }else{
      newLikes.push(userId, ...likedUsers);
    }
    console.log(newLikes);
    setLikedUsers(newLikes);

  };

  const moveUp = (userId: number) => {
    console.log("moveUp", userId);
    const index = users.findIndex(el=>el.id === userId);
    const neusers = [users[index],...users.filter(el=>el.id !== userId)]
    setUsers(neusers);
  };

  const moveDown = (userId: number) => {
    console.log("moveDown", userId);
    const index = users.findIndex(el=>el.id === userId);
    const neusers = [...users.filter(el=>el.id !== userId),users[index]]
    setUsers(neusers);

  };
  // TODO: pass handleDelete to User component

  // TODO: Add "Move Up" and "Move Down" buttons to each of the user
  // TODO: Implement functions to move user up/down the list
  // TODO: Make sure you create new list of users, do not mutate existing list
  // TODO: Call setUsers with new list of users
  // TODO: Pass handleMoveUp and handleMoveDown to User component as props

  return (
    <ul>
      {users.map((user) => (
        <User 
          data={user} 
          deleteCalback={handleDelete} 
          addLikeCalback={handleLike} 
          up ={moveUp} 
          down ={moveDown} 
          key={user.id} 
          isLiked={likedUsers.indexOf(user.id)>-1}/>
      ))}
    </ul>
  );
}

export default Users;
