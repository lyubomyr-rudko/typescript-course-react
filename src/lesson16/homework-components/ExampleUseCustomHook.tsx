import { useState, } from "react";
export function useCustomButtonHook() {
  const [count, setCount] = useState(5);

  const increment = () => {
    setCount((c) => c + 1);
  };
  const decrement = () => {
    setCount((c) => c - 1);
  };

  return {
    count,
    increment,
    decrement
  }
}
