import { useEffect, useState } from "react";
import { CSSProperties } from "styled-components";
import { apiUsersUpdateAll } from './apiUsers.ts'
import { UserForm } from "./UserForm.tsx";
import { ModalWindowWrapper } from "./ModalWindowWrapper.tsx";

export type TUser = {
  id:string,
  firstName:string,
  lastName:string,
  hairColor?: string,
  birthDate:string,
  email:string,
  gender: "male" | "female",
  position?:number
}

interface IUserProps {
  data: TUser,
  handleMoveDown:(user:TUser)=>void,
  handleMoveUp:(user:TUser)=>void
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
  const { data, handleMoveUp, handleMoveDown } = props;

  const userStyle:CSSProperties = {
    display: "flex",
    flexDirection:"row",
    gap:"5px",
    padding:"5px"
  }

  return (
    <li style={userStyle}>
      <span>
        {data.firstName} {data.lastName}
      </span>

      <div>
        <button onClick={()=>handleMoveUp(data as TUser)}>MoveUp</button>
        <button onClick={()=>handleMoveDown(data as TUser)}>MoveDown</button>
      </div>
    </li>
  );
};

export function Users() {
  const [usersData, setUsersData] = useState<TUser[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isModalWindowHidden, setIsModalWindowHidden] = useState<boolean>(true)

  function delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  useEffect(()=>{
    async function fetchUsers(){
      try{
        const response = await fetch("http://localhost:3000/users")
        const data = await response.json();
  
        await delay(2000)
  
        if(data){
          setUsersData(data)
        }
      } catch(e){
        console.error("Error in Users component line 56", e)
      }
    }
    
    async function addUserPosition() {
      for(const user of usersData){
        if(!user.position){
          user.position = usersData.findIndex((element)=>user.id===element.id)
        }
      }
    }

    async function initializeUsersComponent() {
      setIsLoading(true)
      
      await fetchUsers()
      await addUserPosition()
      await apiUsersUpdateAll(usersData)

      setIsLoading(false)
    }

    initializeUsersComponent()
  }, [])

  const handleMoveDown = (user:TUser)=>{
    const targetUserIndex:number = usersData.findIndex((element)=>user.id == element.id)

    if(usersData.length>2 && targetUserIndex+1 < usersData.length){
      const resultingUserArray:TUser[] = [...usersData];

      [resultingUserArray[targetUserIndex], resultingUserArray[targetUserIndex+1]] = [resultingUserArray[targetUserIndex+1], resultingUserArray[targetUserIndex]]

      setUsersData(resultingUserArray)
    }
  }

  const handleMoveUp = (user:TUser)=>{
    const targetUserIndex:number = usersData.findIndex((element)=>user.id == element.id)

    if(usersData.length>2 && targetUserIndex > 0){
      const resultingUserArray:TUser[] = [...usersData];

      [resultingUserArray[targetUserIndex-1], resultingUserArray[targetUserIndex]] = [resultingUserArray[targetUserIndex], resultingUserArray[targetUserIndex-1]]

      setUsersData(resultingUserArray)
    }
  }

  const MainContainerStyles:CSSProperties = {
    display:"flex",
    flexDirection:"row",
    alignItems:"start",
    margin:"10px"
  }

  const handleIsHidden = ()=>{
    setIsModalWindowHidden(!isModalWindowHidden)
  }

  return (
    <div style={MainContainerStyles}>
      <ul>
      {
        isLoading === true && (usersData.length === 0) 
          ? "Loading..."
            : isLoading === false && (usersData.length === 0)
              ? "Connection error or no data"
                : usersData?.map((user) => (
                  <User data={user} key={user.id} handleMoveDown={handleMoveDown} handleMoveUp={handleMoveUp}/>
                ))
      }
      </ul>

      {isLoading === false ? <button className="github-btn" onClick={handleIsHidden}>Add New User</button> : ""}

      <ModalWindowWrapper isHidden={isModalWindowHidden} handleIsHidden={handleIsHidden}/>
    </div>
  );
}

export default Users;
