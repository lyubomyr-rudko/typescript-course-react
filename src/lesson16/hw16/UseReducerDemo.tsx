import {ChangeEvent, ChangeEventHandler, FC, JSX, useReducer} from "react";
import {Input} from "./Input.tsx";
import {reducer, TAppState} from "./reducer.ts";

const initialState: TAppState = {
  name: '',
  lastName: '',
  isLoggedIn: false
}
export const UseReducerDemo:FC = ():JSX.Element => {
  const [{ name, lastName, isLoggedIn }, dispatch] = useReducer(reducer, initialState)
  const handleNameChange:ChangeEventHandler<HTMLInputElement> = (e: ChangeEvent<HTMLInputElement>):void => {
    const name = e.target.value
    dispatch({type: 'setName', payload: name})
  }
  const handleLastNameChange:ChangeEventHandler<HTMLInputElement> = (e: ChangeEvent<HTMLInputElement>):void => {
    const lastName = e.target.value
    dispatch({type: 'setLastName', payload: lastName})
  }

  return (
    <>
     <Input
      value={name}
      onChange={handleNameChange}
     />
     <Input
      value={lastName}
      onChange={handleLastNameChange}
     />
      <button
        onClick={() => name && lastName && dispatch({type: 'login', payload: true})}
        disabled={isLoggedIn || !name || !lastName}
      >
        Login
      </button>
      <button
        onClick={() => dispatch({type: 'logout', payload: false})}
        disabled={!isLoggedIn}
      >
        Logout
      </button>
      <div>{isLoggedIn ? `Welcome ${name} ${lastName}`: 'Login please'}</div>
    </>
  )
}

// this is an example of usage UseReducer hook. this hook is designed to handle state of the app outside a components
// and to provide data to all the components that might need it.
// To use this hook the reducer must be described as a pure function that receives a state and action as a parameters and
// based on type of action change the state and returns a new state
// inside the components that need to receive data useReducer hook must be called with passed to it reducer and initial state, the
// hook will return a state and a dispatch function, this function is for passing actions, objects that describe what actually we
// want to change in our state, to reducer.
