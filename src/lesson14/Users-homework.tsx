import {IUserProps, TAppContext} from "./types.ts";
import {HairColorPreview, TableCell, TableRow} from "./Users-homework.styled.tsx";
import {getDateString} from "./utils.ts";
import {useContext} from "react";
import Button from "./components/Button.tsx"
import {AppContext} from "../App.tsx";

// # Users list and form with api

// 1. Update User list component to fetch data from api
// 2. Add loading state to User list component (show loading message while list is loading)
// 3. Add buttons to move user up/down the list, store position in db json (add position field to each of the users)
// 4. Add form component to create new user shown as modal. Show form on click on the button "Add new user"
// 5. Form to create user needs to have the following inputs
//    1. User first name (text input)
//    2. User last name (text input)
//    3. User hair color (select input)
//    4. User birthDate (datetime input)
//    5. User is female (checkbox input)
//    6. User email (email input)
// 6. Add form validation to the form component
//    1. User first name is required
//    2. User last name is required
//    3. User email is required and should be valid email
//    4. User birthDate is required and should be valid date
// 7. Form submit button of the form component should be disabled if form is invalid
// 8. Show error message for invalid fields

const UserRow = ({user, index, lastIndex }: IUserProps) => {
  const { firstName, lastName, birthDate, gender, hair: {color}, phone,} = user
  const phoneToDisplay: string = phone && phone.replace(/[+' ']/g,'')
  const birthDateToDisplay: string = getDateString(birthDate)

  const { onMoveUser } = useContext<TAppContext>(AppContext)

  return (
    <TableRow>
      <TableCell>{firstName} {lastName}</TableCell>
      <TableCell>{gender}</TableCell>
      <TableCell>
        <HairColorPreview color={color}></HairColorPreview>
      </TableCell>
      <TableCell>{birthDateToDisplay}</TableCell>
      <TableCell>{phoneToDisplay}</TableCell>
      <TableCell>
        <Button
          text='Move Up'
          onClick={() => onMoveUser(index, 'up')}
          disabled={index === 0}
        />
      </TableCell>
      <TableCell>
        <Button
          text='Move Down'
          onClick={() => onMoveUser(index, 'down')}
          disabled={index === lastIndex}
        />
      </TableCell>
    </TableRow>
  );
};

const TableBody = () => {
  const {users,onMoveUser} = useContext<TAppContext>(AppContext)

  return (
    <tbody>
    {users.map((user, idx, array) => (
      <UserRow
        user={user}
        moveUser={onMoveUser}
        key={user.id}
        index={idx}
        lastIndex={array.length - 1}
      />
    ))}
    </tbody>
  );
}

export default TableBody;
