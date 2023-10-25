import usersData from "../users-data";
import { TUser } from "../users-data";
import {Container, Header, Table, TableRow, TableHeader, TableCell, HairColorIcon} from "./Users-homework.styled";

interface IUserProps {
  data: TUser;
}
// TODO: Update User component to display user's name, Gender, Hair color, Birth dat and phone number
// TODO: Style this component using styled-components
// TODO: Use Users-homework.jpg or Users-homework.fig as a reference
// TODO: Add a component to display user's hair color as a colored circle HairColorIcon
// TODO: Add a color prop to HairColorIcon, so it can be used to display different colors
// TODO: Add your styled-components to src/lesson13/Users-homework.styled.tsx

const User = (props: IUserProps) => {
  const { data } = props;

  return (
    <TableRow>
      <TableCell>{data.firstName} {data.lastName}</TableCell>
      <TableCell>{data.gender}</TableCell>
      <TableCell><HairColorIcon color={data.hair.color.toLocaleLowerCase()}></HairColorIcon></TableCell>
      <TableCell>{data.birthDate}</TableCell>
      <TableCell>{data.phone}</TableCell>
    </TableRow>
  );
};

export function Users() {
  // TOOD: update this component to display a header and a list of users
  // User Name | Gender | Hair Color | Birth date | Phone number
  // TODO: Style this component using styled-components
  // TODO: Use Users-homework.jpg or Users-homework.fig as a reference
  // TODO: Add your styled-components to src/lesson13/Users-homework.styled.tsx

  return (
    <Container>
      <Header>Users</Header>
      <Table>
        <thead>
          <TableRow>
            <TableHeader>User Name</TableHeader>
            <TableHeader>Gender</TableHeader>
            <TableHeader>Hair Color</TableHeader>
            <TableHeader>Birth Date</TableHeader>
            <TableHeader>Phone Number</TableHeader>
          </TableRow>
        </thead>
        <tbody>
          {usersData.map((user) => (
            <User data={user} key={user.id} />
          ))}
        </tbody>
      </Table>
    </Container>

  );
}

export default Users;
