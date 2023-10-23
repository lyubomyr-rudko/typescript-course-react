import { useState } from "react";
import "./App.css";
import { Users } from "./lesson14/Users";

export function App() {
  const [show, setShow] = useState(true);

  return (
    <>
      <button onClick={() => setShow(!show)}>Toggle</button>
      {show ? <Users /> : null}
    </>
  );
}

// const Xyz = () => {
//   const id = useId();

//   return <div>{id}</div>;
// };

export default App;
