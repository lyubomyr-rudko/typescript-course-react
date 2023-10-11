import usersData from "../users-data";
import { TUser } from "../users-data";
import { Container, HeadText, HeaderList, HeaderSublist, UnorderedList, List, HairColor } from "./Users-homework.styled";

interface IUserProps {
  data: TUser;
}

const User = (props: IUserProps) => {
  const { data } = props;
  const birthDate = new Intl.DateTimeFormat('en-GB', { dateStyle: 'full', timeStyle: 'long', timeZone: 'Australia/Sydney' }).format(new Date(data.birthDate)).split(' ');

  return (
    <>
    <List>
      {data.firstName} {data.lastName}
    </List>
    <List>{data.gender}</List>
    <List><HairColor hairColor={data.hair.color} /></List>
    <List>{birthDate[1]} {birthDate[2]}, {birthDate[3]}</List>
    <List>{data.phone}</List>
    </>
  );
};

export function Users() {
  return (
    <Container>
    <HeadText>Users</HeadText>
    <HeaderList>
      <HeaderSublist>User Name</HeaderSublist>
      <HeaderSublist>Gender</HeaderSublist>
      <HeaderSublist>Hair Color</HeaderSublist>
      <HeaderSublist>Birth Date</HeaderSublist>
      <HeaderSublist>Phone Number</HeaderSublist>
    </HeaderList>
      {usersData.map((user) => (
        <UnorderedList><User data={user} key={user.id} /></UnorderedList>
        ))}
    </Container>
  );
}

export default Users;
