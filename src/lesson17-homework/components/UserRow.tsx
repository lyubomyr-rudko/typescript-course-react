import {IUserProps} from "../types.ts";
import {useAppDispatch} from "../store";
import {deleteUserById, likeUserById} from "../store/thunkActions.ts";
import {EyeColorPreview, TableCell, TableRow} from "./Components.styled.tsx";
import Button from "./Button.tsx";

export const UserRow = ({user}: IUserProps) => {
  const dispatch = useAppDispatch()

  const {id, firstName, lastName, age, gender, eyeColor:color, phone, likes: {numbers}} = user
  const phoneToDisplay: string = phone && phone.replace(/[+' ']/g,'')

  const deleteUserHandler = (id: number): void => {
    dispatch(deleteUserById(id))
  }

  const likeUserHandler = (id: number): void => {
    dispatch(likeUserById({id, likes: numbers + 1}))
  }

  return (
    <TableRow>
      <TableCell>{firstName} {lastName}</TableCell>
      <TableCell>{gender}</TableCell>
      <TableCell>
        <EyeColorPreview color={color}></EyeColorPreview>
      </TableCell>
      <TableCell>{age}</TableCell>
      <TableCell>{phoneToDisplay}</TableCell>
      <TableCell>{numbers}</TableCell>
      <TableCell>
        <Button
          text={'Like'}
          onClick={() => likeUserHandler(id)}
        />
      </TableCell>
      <TableCell>
        <Button
          text={'Delete'}
          onClick={() => deleteUserHandler(id)}
        />
      </TableCell>
    </TableRow>
  );
};
