import React, { createContext, useState } from "react";

interface IValueContext {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
}

interface IProviderProps {
  children: React.ReactNode;
}

export const ExampleContext = createContext<IValueContext>({} as IValueContext);

const ExampleProvider = ({ children }: IProviderProps) => {

  const [count, setCount] = useState<number>(1);
  return (
    <ExampleContext.Provider value={{ count, setCount }}>
      {children}
    </ExampleContext.Provider>
  )
};

export default ExampleProvider;
