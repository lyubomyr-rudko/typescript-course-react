import "./App.css";
import { UseContext } from "./lesson16/homework/UseContextHook-hw";
import { UseCallback } from "./lesson16/homework/Usecallback-hw";
import { UseReducerCounter } from "./lesson16/homework/UseReducer-hw.tsx";
import {CustomHook} from "./lesson16/homework/UseDebugValue-hw.tsx"
import { Wrapper } from './lesson16/homework/Wrapper.styled'

export function App() {
  return (
    <Wrapper>
      <UseContext />
      <UseCallback />
      <UseReducerCounter />
      <CustomHook />
    </Wrapper>
  );
}

export default App;
