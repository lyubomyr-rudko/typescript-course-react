import { useState, ChangeEvent } from "react";
import style from "./form.module.css";
import { IUserForm, TValues, IUserFormProps} from "../types";


function UserForm(props:IUserFormProps) {
  const [user, setUser] = useState<IUserForm>({
    firstName: '',
    lastName: '',
    age: 30,
    gender: 'male',
    hair:{
        color:'',
    },
    birthDate:'',
    position: 0,
    email:'',
  });

  const userGenderOptions = [
    {
      label: "Male",
      value: "male",
    },
    {
      label: "Female",
      value: "female",
    },
  ];
  const userHairOptions = [
    {
      label: "Black",
      value: "black",
    },
    {
      label: "Blue",
      value: "blue",
    },
  ];
  
  const setUserProperty = (properuty:keyof IUserForm, value:TValues)=>{
    setUser((user)=>{
      return {
        ...user,
        [properuty]:value
      }
    })
  }

  const handleSubmit = ()=>{

    props.submit(user)
  }

  const changeGender = ()=>{
    if(user.gender === 'male'){
      setUserProperty('gender','female');
    }else{
      setUserProperty('gender','male');
    }
  
  }
  
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
  return (
    <div className={style.container}>
      <form onSubmit={handleSubmit}>
        <div>
            <input
            id="formname"
            type="text"
            value={user.firstName}
            onChange={(e)=>{setUserProperty('firstName',e.target.value)}}
            required
          />
          <label htmlFor="formname">first Name</label>
        </div>
        <div>
            <input
            id="formlastName"
            type="text"
            value={user.lastName}
            onChange={(e)=>{setUserProperty('lastName',e.target.value)}}
            required
          />
          <label htmlFor="formlastName">last Name</label>
        </div>
        <div>
          <select
            id="formhair"
            value={user.hair.color}
            onChange={(e)=>{setUserProperty('hair',{color:e.target.value})}}
            >
              {userHairOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
          </select>
          <label htmlFor="formhair">Hair</label>
        </div>
        
        
        <div>
          <input
            id="formbirthDate"
            type="date"
            value={user.birthDate}
            onChange={(e)=>{setUserProperty('birthDate',e.target.value.toString().split('T')[0])}}
          />
          <label htmlFor="formbirthDate">birthDate</label>
        </div>
        <div>
          <input type="checkbox" id="gender" name="gender" onChange={changeGender} checked={user.gender==='female'} />
          <label htmlFor="gender">Is female</label>
        </div>
        <div>
        
        <input type="email" id="email" pattern=".+@gmail\.com" size={30} 
          onChange={(e)=>{setUserProperty('email',{color:e.target.value})}} required />
          <label htmlFor="email">Enter your email</label>
        </div>
        <button type="submit">Submit</button>
        <button type="submit" onClick={props.close}>Cancel</button>
      </form>
    </div>
  );
  
}

export default UserForm;
