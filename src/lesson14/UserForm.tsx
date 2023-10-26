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

import { ChangeEvent, FormEvent, useState } from "react"
import { TUser } from "./Users-homework"
import { CSSProperties } from "styled-components"
import { apiUserAddNew } from "./apiUsers"

interface IUserFormProps{
    handleIsHidden:()=>void
}

export function UserForm(props:IUserFormProps){
    const {handleIsHidden} = props

    function generateRandomId() {
        const timestamp = new Date().getTime();
        const random = Math.floor(Math.random() * 1000);
        return `${timestamp}-${random}`;
    }
    
    const [currentUser, setCurrentUser] = useState<TUser>({
        id: generateRandomId(),
        firstName:"",
        lastName:"",
        gender:"male",
        birthDate:"",
        email:""
    })

    const [isFormValid, setIsFormValid] = useState<boolean>(false)

    const handleFormSubmit = (e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        if(e.currentTarget.checkValidity()){
            handleIsHidden()

            apiUserAddNew(currentUser)
            alert(`User "${currentUser.firstName} ${currentUser.lastName}" was added to the db.json`)

            setCurrentUser({
                id: generateRandomId(),
                firstName:"",
                lastName:"",
                gender:"male",
                birthDate:"",
                email:""
            })
        }
    }

    const FormStyles:CSSProperties = {
        display:"flex",
        flexDirection:"column",
        fontSize:"20px",
        lineHeight:"2",
        color:"Black"
    }

    const PropertyContainerStyles:CSSProperties = {
        display:"flex",
        flexDirection:"row",
        gap:"8px",
        padding:"8px"
    }


    const handleFirstNameChange = (e: ChangeEvent<HTMLInputElement>)=>{
        setCurrentUser({
            ...currentUser,
            firstName: e.target.value,
        });
    }

    const handleLastNameChange = (e: ChangeEvent<HTMLInputElement>)=>{
        setCurrentUser({
            ...currentUser,
            lastName: e.target.value,
        });
    }

    const handleBirthDateChange = (e: ChangeEvent<HTMLInputElement>)=>{
        setCurrentUser({
            ...currentUser,
            birthDate: e.target.value,
        });
    }

    const handleHairColorChange = (e: ChangeEvent<HTMLSelectElement>)=>{
        setCurrentUser({
            ...currentUser,
            hairColor: e.target.value,
        });
    } 

    const handleGenderChange = (e: ChangeEvent<HTMLInputElement>)=>{
        setCurrentUser({
            ...currentUser,
            gender: e.target.checked ? "female" : "male",
        });
    }

    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>)=>{
        setCurrentUser({
            ...currentUser,
            email: e.target.value,
        });
    }

    const handleFormChange = (e: FormEvent<HTMLFormElement>)=>{
        if(e.currentTarget.checkValidity()){
            setIsFormValid(true)
        } else{
            setIsFormValid(false)
        }
    }

    return (
        <form style={FormStyles} onChange={handleFormChange} onSubmit={handleFormSubmit}>
            <div style={PropertyContainerStyles}>
                <label>FirstName: </label>
                <input id="firstName" value={currentUser.firstName} onChange={handleFirstNameChange} required></input>
            </div>

            <div style={PropertyContainerStyles}>
                <label>LastName: </label>
                <input id="firstName" value={currentUser.lastName} onChange={handleLastNameChange} required></input>
            </div>

            <div style={PropertyContainerStyles}>
                <label>Hair color: </label>
                <select value={currentUser.hairColor} onChange={handleHairColorChange}>
                    <option value="">Unset</option>
                    <option value="black">Black</option>
                    <option value="blond">Blond</option>
                    <option value="brown">Brown</option>
                </select>
            </div>

            <div style={PropertyContainerStyles}>
                <label>Birth date: </label>
                <input type="date" value={currentUser.birthDate} onChange={handleBirthDateChange} required></input>
            </div>
           

            <div style={PropertyContainerStyles}>
                <label>Is female?: </label>
                <input type="checkbox" value={currentUser.gender} onChange={handleGenderChange}></input>
            </div>


            <div style={PropertyContainerStyles}>
                <label>Email: </label>
                <input type="email" value={currentUser.email} onChange={handleEmailChange} required></input>
            </div>
           

            <input className="github-btn" type="submit" content="Submit" disabled={!isFormValid}/>
        </form>
    )
}