import React, { createContext, useEffect } from "react";
import { IUser } from "./UseContextDemo";

type ThemeKind = "light" | "dark";
interface ITheme {
  kind: ThemeKind;
  setKind: (kind: ThemeKind) => void;
  data: number;
  usersList: IUser[];
  deleteUser: (id: number) => void;
}

export const StateContext = createContext<ITheme>({
  kind: "light",
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setKind: () => {},
  data: 0,
  usersList: [],
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  deleteUser: () => {},
});

interface StateProviderProps {
  children: React.ReactNode;
}

export const StateProvider: React.FC<StateProviderProps> = ({ children }) => {
  const [kind, setKind] = React.useState<ThemeKind>("light");

  const [usersList, setUsersList] = React.useState<IUser[]>([]);

  const fetchUsers = async () => {
    const response = await fetch("http://localhost:3004/users");
    const data = await response.json();
    console.log("fetchUsers", data);

    setUsersList(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // const [data, setData] = React.useState<{TUser[]}>(0);
  const deleteUser = (id: number) => {
    console.log(id);
  };

  console.log("render usersList", usersList);

  return (
    <StateContext.Provider
      value={{ kind, setKind, data: 1, usersList, deleteUser }}
    >
      {children}
    </StateContext.Provider>
  );
};
