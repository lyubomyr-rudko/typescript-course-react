import React, { useState, useCallback } from 'react';

export const UseCallback = () => {
  const [count, setCount] = useState(0);

  const incrementCount = useCallback(() => {
    setCount(count + 1);
  }, [count]); 

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={incrementCount}>Increment Count</button>
    </div>
  );
}

