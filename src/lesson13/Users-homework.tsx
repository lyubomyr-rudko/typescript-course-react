import usersData from "../users-data";
import { TUser } from "../users-data";
import {
  TableRow,
  TableCell,
  HairColorPreview
} from "./Users-homework.styled.tsx";
import {getDateString} from "./utils.ts";

interface IUserProps {
  user: TUser;
}
// TODO: Update User component to display user's name, Gender, Hair color, Birth dat and phone number
// TODO: Style this component using styled-components
// TODO: Use Users-homework.jpg or Users-homework.fig as a reference
// TODO: Add a component to display user's hair color as a colored circle HairColorIcon
// TODO: Add a color prop to HairColorIcon, so it can be used to display different colors
// TODO: Add your styled-components to src/lesson13/Users-homework.styled.tsx

const UserRow = ({ user }: IUserProps) => {
  const { firstName, lastName, birthDate, gender, hair: {color}, phone} = user
  const phoneToDisplay: string = phone.replace(/[+' ']/g,'')
  const birthDateToDisplay: string = getDateString(birthDate)
  return (
    <TableRow>
      <TableCell>{firstName} {lastName}</TableCell>
      <TableCell>{gender}</TableCell>
      <TableCell>
        <HairColorPreview color={color}></HairColorPreview>
      </TableCell>
      <TableCell>{birthDateToDisplay}</TableCell>
      <TableCell>{phoneToDisplay}</TableCell>
    </TableRow>
  );
};

const TableBody = () => {
  // TOOD: update this component to display a header and a list of users
  // User Name | Gender | Hair Color | Birth date | Phone number
  // TODO: Style this component using styled-components
  // TODO: Use Users-homework.jpg or Users-homework.fig as a reference
  // TODO: Add your styled-components to src/lesson13/Users-homework.styled.tsx

  return (
      <tbody>
      {usersData.map((user) => (
          <UserRow user={user} key={user.id} />
      ))}
      </tbody>
  );
}

export default TableBody;
