import usersData from "../users-data";
import { TUser } from "../users-data";

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
    <li>
      {data.firstName} {data.lastName}
    </li>
  );
};

export function Users() {
  // TOOD: update this component to display a header and a list of users
  // User Name | Gender | Hair Color | Birth date | Phone number
  // TODO: Style this component using styled-components
  // TODO: Use Users-homework.jpg or Users-homework.fig as a reference
  // TODO: Add your styled-components to src/lesson13/Users-homework.styled.tsx

  return (
    <ul>
      {usersData.map((user) => (
        <User data={user} key={user.id} />
      ))}
    </ul>
  );
}

export default Users;
