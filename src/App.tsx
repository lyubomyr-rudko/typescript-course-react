import { useId, useState } from "react";
import "./App.css";
// import { CustomHookDemo } from "./lesson15/CustomHookDemo";
// import { UseDeferredValueDemo } from "./lesson16/UseDeferredValueDemo";
// import { UseReducerDemo } from "./lesson16/UseReducerDemo";
// import { UseIdDemo } from "./lesson16/UseIdDemo";
// import { RefProblemDemo } from "./lesson16/UseImperativeHandleDemo";
// import { UseImperativeHandleDemo } from "./lesson16/UseImperativeHandleDemo";
// import { UseMemoDemo } from "./lesson15/UseMemoDemo";
// import { UseRefDemo } from "./lesson15/UseRefDemo";
// import { LoginForm } from "./lesson15/UseCallbackDemo";
// import { Users } from "./lesson15/UseContextDemo";
// import { StateProvider } from "./lesson15/StateContext";

import UseCallbackExample from "./lesson16/HW/UseCallbackExample/UseCallbackExample";
import UseEffectExample from "./lesson16/HW/UseEffectExample/UseEffectExample";
import UseStateExample from "./lesson16/HW/UseStateExample/UseStateExample";
import ExampleProvider from "./lesson16/HW/UseContextExample/ExampleProvider";
import UseContextDemo from "./lesson16/HW/UseContextExample/UseContextDemo";

// interface IUserForm {
//   email: string;
//   password: string;
// }

export function App() {

  return (
    <>
      <ExampleProvider>
        <UseCallbackExample />
        <br />
        <UseEffectExample />
        <br />
        <UseStateExample />
        <br />
        <UseContextDemo />
      </ExampleProvider>



      {/* <LoginForm onSubmit={console.log} /> */}
      {/* <UseRefDemo /> */}
      {/* <UseMemoDemo /> */}
      {/* <StateProvider>
        <Users />
      </StateProvider> */}
      {/* <UseIdDemo />
      <UseIdDemo />
      <Xyz />
      <Xyz />
      <Xyz />
      <Xyz />
      <UseIdDemo /> */}
      {/* <RefProblemDemo /> */}
      {/* <UseImperativeHandleDemo /> */}
      {/* <UseDeferredValueDemo /> */}

      {/* <UseReducerDemo /> */}
      {/* <CustomHookDemo /> */}
    </>
  );
}

// const Xyz = () => {
//   const id = useId();

//   return <div>{id}</div>;
// };

export default App;
