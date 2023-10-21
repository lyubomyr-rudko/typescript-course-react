import { useState, useContext } from "react";
import { ExampleContext } from "../UseContextExample/ExampleProvider";

const UseStateExample = () => {
  const [count, setCount] = useState<number>(1);

  return (
    <>
      <h2>Example UseState</h2>
      <button onClick={() => setCount(prev => prev + 1)}>INC count</button>
      <p>{count}</p>
    </>
  )
};

export default UseStateExample;

// useSate used to create and manage state in functional components.
//It allows components to set and update state data during rendering and react to changes in that state to rerender component.

//  hook useState return array with two value  state  and setState;
// in this example count is a current state component, setCount is a function for update state