import usersData from "../users-data";
import { TUser } from "../users-data";
import { Table, Thead, Tbody, Container, HairColorIcon, Title } from './Users-homework.styled'

interface IUserProps {
  data: TUser[];
  tableHead: string[];
}
// TODO: Update User component to display user's name, Gender, Hair color, Birth dat and phone number
// TODO: Style this component using styled-components
// TODO: Use Users-homework.jpg or Users-homework.fig as a reference
// TODO: Add a component to display user's hair color as a colored circle HairColorIcon
// TODO: Add a color prop to HairColorIcon, so it can be used to display different colors
// TODO: Add your styled-components to src/lesson13/Users-homework.styled.tsx

const UserTable = (props: IUserProps) => {

  const { data, tableHead } = props;

  const hairColors: { [key: string]: string } = {
    black: '#000',
    blond: '#faf0be',
    brown: '#5c4827 ',
    chestnut: '#bdaa8d',
    auburn: '#9d3e0c',
  };

  return (
    <Table>
      <Thead>
        <tr>
          {tableHead.map(head => <th key={head}>{head}</th>)}
        </tr>
      </Thead>
      <Tbody>
        {data.map(item => (
          <tr key={item.id}>
            <td>{item.firstName} {item.lastName}</td>
            <td>{item.gender}</td>
            <td><HairColorIcon color={hairColors[`${item.hair.color.toLowerCase()}`]} /></td>
            <td>{item.birthDate}</td>
            <td>{item.phone}</td>
          </tr>
        ))
        }
      </Tbody>
    </Table>
  );
};

export function Users() {
  // TOOD: update this component to display a header and a list of users
  // User Name | Gender | Hair Color | Birth date | Phone number
  // TODO: Style this component using styled-components
  // TODO: Use Users-homework.jpg or Users-homework.fig as a reference
  // TODO: Add your styled-components to src/lesson13/Users-homework.styled.tsx
  const tableHead = ['User Name', 'Gender', 'Hair Color', 'Birth date', 'Phone number'];
  return (
    <Container>
      <Title>Users</Title>
      <UserTable data={usersData} tableHead={tableHead} />
    </Container>

  );
}

export default Users;
