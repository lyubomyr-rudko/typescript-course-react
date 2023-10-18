import { useState } from "react";
import "./App.css";
import { Users } from "./lesson12/Users-homework";

export function App() {
  const [show, setShow] = useState(true);

  return (
    <>
      <button onClick={() => setShow(!show)}>Toggle</button>
      {show ? <Users /> : null}
    </>
  );
}

export default App;
