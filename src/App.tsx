import {ChangeEvent, ChangeEventHandler, useState} from "react";
import "./App.css";
import {UseStateDemo} from "./lesson16/hw16/UseStateDemo.tsx";
import {ContextConsumerDemo} from "./lesson16/hw16/ContextConsumerDemo.tsx";
import {UseContextDemo} from "./lesson16/hw16/UseContextDemo.tsx";
import {UseCallBackDemo} from "./lesson16/hw16/UseCallBackDemo.tsx";
import {UseReducerDemo} from "./lesson16/hw16/UseReducerDemo.tsx";

export function App() {
  const [name, setName] = useState<string>('')
  const nameInputHandler: ChangeEventHandler<HTMLInputElement> = (e:ChangeEvent<HTMLInputElement>):void => {
    setName(e.target.value)
  }
  return (
    <>
      <UseStateDemo
        value={name}
        onChange={nameInputHandler}
      />
      <UseContextDemo context={{name}}>
        <ContextConsumerDemo />
      </UseContextDemo>
      <UseCallBackDemo />
      <UseReducerDemo />
    </>
  );
}

export default App;
