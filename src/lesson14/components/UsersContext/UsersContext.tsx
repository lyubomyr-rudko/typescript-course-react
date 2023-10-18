import React, { useState } from 'react';

import { api } from '../../api/api';
import { sort } from '../../utils/sort';
import { IUsersContext, TUser, IUsersProvaiderProps } from '../../types';

export const UsersContext = React.createContext<IUsersContext>({
    users: [],
    isLoading: false,
    handleSwap: () => ({}),
    handleAddUser: () => ({}),
    usersCount: 0,
});

export const UsersProvaider: React.FC<IUsersProvaiderProps> = ({
    children,
}) => {
    const [users, setUsers] = React.useState<IUsersContext['users']>([]);
    const [usersCount, setUsersCount] = useState<number>(0);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [isDataUpdateRequired, setIsDataUpdateRequired] =
        React.useState<boolean>(true);

    React.useEffect(() => {
        if (isDataUpdateRequired) {
            (async () => {
                setIsLoading(true);
                const res = await api.getUsers();
                if (res?.data) {
                    const sortedData = sort<TUser>(res.data);

                    setUsers(sortedData);
                    setUsersCount(sortedData.length);
                }

                setTimeout(() => setIsLoading(false), 500);
                setIsDataUpdateRequired(false);
            })();
        }
    }, [isDataUpdateRequired]);

    const handleSwap: IUsersContext['handleSwap'] = async (id, position, n) => {
        await api.updatePosition(id, position + n);
        await api.updatePosition(id + n, position);
        setIsDataUpdateRequired(true);
    };

    const handleAddUser: IUsersContext['handleAddUser'] = async (formData) => {
        await api.addUser(formData);
        setIsDataUpdateRequired(true);
    };

    return (
        <UsersContext.Provider
            value={{ users, isLoading, handleSwap, usersCount, handleAddUser }}
        >
            {children}
        </UsersContext.Provider>
    );
};
