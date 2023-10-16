import { useState, useEffect } from "react";
import { IUser, IUserProps, IUserForm } from "./types";
import {Container, HairColor, SubContainer, SubContainerHeader, ContainerHeader, ContainerTablename } from "./Users-homework.styled"
import styles from "./Users.module.css"
import Spinner from "./spiner";
import Form from "./newUserForm"

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
  const { data } = props;

  return (
      <Container>
        <SubContainer>
          <span className={`${styles.dataContainer} ${styles.firstElement}`}>{data.firstName} {data.lastName}</span>
          <span className={styles.dataContainer}>{data.gender}</span>
          <span className={styles.dataContainer}><HairColor color={data.hair.color}/></span>
          <span className={styles.dataContainer}>{data.birthDate}</span>
          <span className={styles.dataContainer}>{data.phone}</span>
          <span className={styles.dataContainer}><button style={{width:'30px', height:'30px'}} onClick={() => props.up(data.id)}>UP</button></span>
        </SubContainer>
      </Container>
  );
};

const Header = () => {


  return (
      <ContainerHeader>
        <SubContainerHeader>
          <span className={styles.dataContainer}>User Name</span>
          <span className={styles.dataContainer}>Gender</span>
          <span className={styles.dataContainer}>Hair Color</span>
          <span className={styles.dataContainer}>Birth date</span>
          <span className={styles.dataContainer}>Phone number</span>
        </SubContainerHeader>
      </ContainerHeader>
  );
};

export function Users() {
  const [usersList, setUsersList] = useState<IUser[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [newUserForm, setNewUserForm] = useState<boolean>(false);


  useEffect(() => {
    if(!loading) setLoading(true);
    getUsers();
    setLoading(false);
  }, []);


  const getUsers = async ()=>{
    const response = await fetch("http://localhost:3008/users?_sort=position&_order=desc");
    const data = await response.json();
    setUsersList(data);
  }

  const setUp = async (id:number)=>{
    let newIndex = 1;
    if(usersList[0].position){
      newIndex = usersList[0].position + 1;
    }
    await fetch(`http://localhost:3008/users/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        position: newIndex,
      }),
    });
    await getUsers()
  }

  const addUser = async (data:IUserForm)=>{
    await fetch(`http://localhost:3008/users/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    await getUsers()
  }


  const getUpMediator = async (id:number)=>{
    setLoading(true);
    await setUp(id);
    setLoading(false);
  }
  const addNewUserMediator = async (data:IUserForm)=>{
    setNewUserForm(false)
    setLoading(true);
    await addUser(data);
    setLoading(false);
  }


  return (
    <div className={styles.mainContainer}>
      <ContainerTablename>
        <div className={styles.dataContainer}>Users</div>
        <button style={{width:'70px', height:'30px'}} onClick={() => setNewUserForm(true)}>Add new</button>
      </ContainerTablename>
      <Header/>
      {loading? <Spinner/> : usersList.map((user) => (
        <User data={user} key={user.id} up={getUpMediator}/>
      ))}
      {newUserForm && <Form submit={addNewUserMediator} close={()=>setNewUserForm(false)}/>}
    </div>
  );
}

export default Users;

