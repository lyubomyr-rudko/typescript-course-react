import {Context, createContext, FC, JSX} from "react";

export type TAppContext = {[key: string]: string}
export const AppContext:Context<TAppContext> = createContext<TAppContext>({})

interface IContextProps {
  context: TAppContext,
  children: JSX.Element
}
export const UseContextDemo:FC<IContextProps> = ({ context, children }: IContextProps):JSX.Element => {
  return (
    <AppContext.Provider value={context}>
      {children}
    </AppContext.Provider>
  )
}

// This is an example of usage UseContext hook. The hook is used for passing value to children components that need to
// use value avoiding props drilling. To use it must be done the following steps:
// - create context with using React.createContext function
// - create context provider and pass to it as value attr context that was created at first step
// - put all the components that should receive data from context inside the provider as a children
// - inside each of children component that need data from context get that data by using useContext hook and pass the
// context inside the hook call
