import {ChangeEventHandler, FC, JSX} from "react";
import {Input} from "./Input.tsx";

interface IProps {
  value: string
  onChange: ChangeEventHandler
}
export const UseStateDemo:FC<IProps> = ({value, onChange}: IProps):JSX.Element => {
  return (
    <div>
      <Input
        value={value}
        onChange={onChange}
      />
      <div>Value received through useState: {value}</div>
    </div>
  )
}

// Here is an example of usage useState hook in order to create
// a controlled input and display its value on the screen.
// useState hook returns a tuple in which the first element is a current state
// that can be passed as a parameter to useState function and the second element is
// a function for change state by calling of this function and passing a new state to this function.
// In general hook is designed for managing local state of functional components
