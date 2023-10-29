import { memo } from 'react';

import { TUser } from '../users-data';

interface userProps {
  user: TUser;
  handleLike: (id: number, body: { isLike: boolean }) => void;
  handledelete: (id: number) => void;
}

const User = memo(({ user, handleLike, handledelete }: userProps) => {
  // TODO: + use db.json file to store data, use json-server to implement api
  // TODO: + use redux-toolkit to implement state to fetch and update users, with redux thunk for async actions
  // TODO:+ use redux slice to generate actions and reducers, create selectors to implement all the logic.
  // TODO: + do not use useState to store data locally, use redux store instead
  // TODO: + do not filter data locally, use redux selectors instead
  // TODO: + use nested selectors to filter data
  // TODO:+ move all data-related logic (filtering) to redux store

  // TODO:+ add logic to like user(s)
  // TODO:+ add logic to delete user(s)
  // TODO: +add lotic to filter users
  // TODO:+ do not focus on styling

  return (
    <li>
      <span>
        {user.firstName} {user.lastName}
      </span>
      {user?.isLike && <span>💝</span>}
      <button onClick={() => handleLike(user.id, { isLike: !user.isLike })}>Like</button>
      <button onClick={() => handledelete(user.id)}>Delete</button>
    </li>
  );
});


export default User;
