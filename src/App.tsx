import { useState } from "react";
import "./App.css";
import { Users } from "./lesson14/Users-homework";

export function App() {
  const [show, setShow] = useState(true);

  return (
    <>
      {/* <button onClick={() => setShow(!show)}>Toggle</button> */}
      <Users />
    </>
  );
}

export default App;
