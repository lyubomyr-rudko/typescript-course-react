import { useContext } from "react"
import { ExampleContext } from "./ExampleProvider"

const ChildComponent = () => {
  const { count } = useContext(ExampleContext);
  return (
    <p> Context count: {count}</p>
  )
}

const UseContextDemo = () => {
  const { setCount } = useContext(ExampleContext);
  return (
    <>
      <h2>UseContext main</h2>
      <button onClick={() => setCount(prev => prev + 1)} >Inc</button>
      <ChildComponent />
    </>
  )
}

export default UseContextDemo;

//UseContext is  used to pass data to components without props drilling.
// - create a context using createContext (in this case ExampleContext)
// - create Provider for context. The Provider provides a context value and determines how this value will be available to child components (ExampleProvider)
// - Wrap app in a context provider to make it available to all child components
// - can use components nested in ExampleProvider can use useContext(ExampleContext) to access data from the context without props drilling