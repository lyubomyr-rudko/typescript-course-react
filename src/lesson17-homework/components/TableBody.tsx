import {useAppSelector} from "../store";
import {filteredUsersSelector} from "../store/selectors.ts";
import {UserRow} from "./UserRow.tsx";

export const TableBody = () => {
  const users = useAppSelector(filteredUsersSelector)

  return (
    <tbody>
    {users.map((user) => (
      <UserRow
        user={user}
        key={user.id}
      />
    ))}
    </tbody>
  );
}
