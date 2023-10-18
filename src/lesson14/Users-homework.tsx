import { useContext } from 'react';

import { UsersContext } from './components/UsersContext/UsersContext';
import UserTable from './components/UsersTable/UsersTable';
import Loader from './components/Loader';
import AddUserForm from './components/AddUserForm/AddUserForm';

import { Section, Title, Container } from './Users-homework.styled';

export function Users() {
    const { isLoading } = useContext(UsersContext);

    return (
        <>
            {isLoading && <Loader />}
            <Section>
                <Container>
                    <Title>Users</Title>
                    <AddUserForm />
                    <UserTable />
                </Container>
            </Section>
        </>
    );
}

export default Users;
