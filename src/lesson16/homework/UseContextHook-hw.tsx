import React, { createContext, useContext, useEffect } from 'react';
import { TUser } from "../../users-data";

interface IUserProps {
  data: TUser;
}

const theme = {
    color: 'white',
    background: 'black',
}

const ThemeContext = createContext(theme);

type ThemeContextProviderProps = {
    children: React.ReactNode
}

export const ThemeContextProvider = ({ children }: ThemeContextProviderProps) => {
    return (
       <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider> 
    )
}

function MyComponent(props: IUserProps) {
    const theme = useContext(ThemeContext)
    const {data} = props;
    return (
        <li style={{ color: theme.color, background: theme.background }}>
            <span>{data.firstName}</span>
            <span>{data.lastName}</span>
            <span>{data.gender}</span>
            <span>{data.birthDate}</span>
        </li>
    );
}

export function UseContext() {
    const [usersList, setUsersList] = React.useState<TUser[]>([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        const response = await fetch("http://localhost:3004/users");
        const data = await response.json();

        setUsersList(data);
    };
    
    return (
        <ul>
            <ThemeContextProvider>
            {usersList.map((user) => (
                <MyComponent data={user} key={user.id}/>
            ))}
            </ThemeContextProvider>
        </ul>
  );
}
