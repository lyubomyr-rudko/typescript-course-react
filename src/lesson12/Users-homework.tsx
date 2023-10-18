import React, { useCallback, useState } from "react";
import usersData from "../users-data";
import { TUser } from "../users-data";
import { CSSProperties } from "styled-components";

interface IUserProps {
  data: {
    firstName: string;
    lastName: string;
  },
  handleDelete:(user:TUser)=>void,
  handleMoveDown:(user:TUser)=>void,
  handleMoveUp:(user:TUser)=>void
}

const User = (props: IUserProps) => {
  const [isLiked, setIsLiked] = useState(false)
  const { data, handleDelete, handleMoveDown, handleMoveUp } = props;
  const [userColor, setUserColor] = useState(getRandomColor())
  const [userFont, setUserFont] = useState(getNegativeColor(userColor))
  // TODO: add delete button to each of the user
  // TODO: implement logic to delete user

  // TODO: add a Like button to each of the user
  // TODO: add a state to keep liked state - is user liked or not (true/false) - useState, default value false
  // TODO: implement logic to like user - click on the like button should change state of the user (liked/not liked
  // TODO: display hart icon if user is liked (💝)

  const handleLike = ()=>{
    setIsLiked(!isLiked)
  }

  const userStyle:CSSProperties = {
    backgroundColor: userColor,
    color:userFont,
    display: "flex",
    flexDirection:"row",
    gap:"5px",
    padding:"5px"
  }

  function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  
  function getNegativeColor(color:string) {
    if (color.charAt(0) === '#') {
      color = color.slice(1);
    }

    const colorInt = parseInt(color, 16);
    const negativeColorInt = ~colorInt & 0xFFFFFF;
    const negativeColor = `#${negativeColorInt.toString(16).padStart(6, '0')}`;
  
    return negativeColor;
  }

  return (
    <li style={userStyle}>
      <span>
        {data.firstName} {data.lastName} {isLiked ? "💝" : ""}
      </span>

      <div>
        <button onClick={()=>handleMoveUp(data as TUser)}>MoveUp</button>
        <button onClick={()=>handleMoveDown(data as TUser)}>MoveDown</button>
      </div>
      <button onClick={handleLike}>{isLiked ? "Dislike" : "Like"}</button>
      <button onClick={()=>handleDelete(data as TUser)}>Delete</button>
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
    const filteredNewArray = users.filter((element)=>element.id !== user.id)
    setUsers(filteredNewArray)
  };

  const handleMoveDown = (user:TUser)=>{
    const targetUserIndex:number = users.findIndex((element)=>user.id == element.id)

    if(users.length>2 && targetUserIndex+1 < users.length){
      const resultingUserArray:TUser[] = [...users];

      [resultingUserArray[targetUserIndex], resultingUserArray[targetUserIndex+1]] = [resultingUserArray[targetUserIndex+1], resultingUserArray[targetUserIndex]]

      setUsers(resultingUserArray)
    }
  }
  const handleMoveUp = (user:TUser)=>{
    const targetUserIndex:number = users.findIndex((element)=>user.id == element.id)

    if(users.length>2 && targetUserIndex > 0){
      const resultingUserArray:TUser[] = [...users];

      [resultingUserArray[targetUserIndex-1], resultingUserArray[targetUserIndex]] = [resultingUserArray[targetUserIndex], resultingUserArray[targetUserIndex-1]]

      setUsers(resultingUserArray)
    }
  }
  // TODO: pass handleDelete to User component

  // TODO: Add "Move Up" and "Move Down" buttons to each of the user
  // TODO: Implement functions to move user up/down the list
  // TODO: Make sure you create new list of users, do not mutate existing list
  // TODO: Call setUsers with new list of users
  // TODO: Pass handleMoveUp and handleMoveDown to User component as props

  return (
    <ul>
      {users.map((user) => (
        <User data={user} key={user.id} handleDelete={handleDelete} handleMoveDown={handleMoveDown} handleMoveUp={handleMoveUp}/>
      ))}
    </ul>
  );
}

export default Users;
