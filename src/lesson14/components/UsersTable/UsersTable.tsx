import { useContext } from 'react';

import { UsersContext } from '../UsersContext';
import User from '../User';

import { Table, Thead, Tbody } from './UsersTable.styled';

const UserTable = () => {
    const thead = [
        'Swap',
        'User Name',
        'Gender',
        'Hair Color',
        'Birth date',
        'Phone number',
    ];
    const { users } = useContext(UsersContext);

    return (
        <Table>
            <Thead>
                <tr>
                    {thead.map((el) => (
                        <th key={el}>{el}</th>
                    ))}
                </tr>
            </Thead>

            <Tbody>
                {users.map((user, i) => (
                    <User data={user} indx={i} key={user.id} />
                ))}
            </Tbody>
        </Table>
    );
};

export default UserTable;
