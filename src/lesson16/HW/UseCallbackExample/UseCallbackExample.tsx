import { useCallback, useState } from 'react';

const ChildComponent = ({ onClick }: { onClick: () => void }) => {
  return (
    <button onClick={onClick}>INC</button>
  )
}

const UseCallbackExample = () => {
  const [count, setCount] = useState<number>(0);

  const handleClick = (): void => {
    setCount(prev => prev + 1);
  }

  const memoizedHandleClick = useCallback(handleClick, [count]);

  return (
    <div>
      <h1>Exmple UseCallback</h1>
      <p>{count}</p>
      <ChildComponent onClick={memoizedHandleClick} />
    </div>
  )
}

export default UseCallbackExample;

// useCallback return a memoized function that can be passed to components without rerendering. first arg is a function, second arg  is a dependencies.
// In this example [count] parameter in useCallback tells React that the function should be redone when count changes. 