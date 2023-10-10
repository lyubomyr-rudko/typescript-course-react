import usersData from '../users-data';
import { TUser } from '../users-data';
import {
    Section,
    Title,
    Container,
    Table,
    Thead,
    Tbody,
    HairColorIcon,
} from './Users-homework.styled';

interface IUserProps {
    data: TUser;
}

const User = ({ data }: IUserProps) => {
    const { firstName, lastName, birthDate, gender, hair, phone } = data;
    const formateBirthDate = new Date(birthDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
    return (
        <tr>
            <td>
                {firstName} {lastName}
            </td>
            <td>{gender}</td>
            <td>
                <HairColorIcon color={hair.color.toLowerCase()} />
            </td>
            <td>{formateBirthDate}</td>
            <td>{phone}</td>
        </tr>
    );
};

const UserTable = () => {
    const thead = [
        'User Name',
        'Gender',
        'Hair Color',
        'Birth date',
        'Phone number',
    ];
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
                {usersData.map((user) => (
                    <User data={user} key={user.id} />
                ))}
            </Tbody>
        </Table>
    );
};

export function Users() {
    return (
        <Section>
            <Container>
                <Title>Users</Title>
                <UserTable />
            </Container>
        </Section>
    );
}

export default Users;
