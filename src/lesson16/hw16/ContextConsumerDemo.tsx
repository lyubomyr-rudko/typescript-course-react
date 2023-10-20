import {FC, JSX, useContext} from "react";
import {AppContext, TAppContext} from "./UseContextDemo.tsx";


export const ContextConsumerDemo:FC = ():JSX.Element => {
  const { name } = useContext<TAppContext>(AppContext)
  return <div>Value received through context: {name}</div>
}
