import { useEffect, useCallback } from 'react';
import { IUser } from './types';
import { useSelector } from 'react-redux';
import { fetchUsers} from './actions';
import { filteredUsersSelector } from './selectors';
import {
  updateGenderFilter,
  updateEyeColorFilter,
  updateAgeFilter,
} from './filterSlice'
import { RootState } from './store';
import { updateUser, deleteUser } from './usersSlice';
import { useAppSelector, useAppDispatch } from './hooks';

interface IUserProps {
  data: IUser; 
  handleLike: (id: string, body: { isLike: boolean }) => void;
  handleDelete: (id: string) => void
}

const User = (props: IUserProps) => {
  const { data, handleDelete, handleLike } = props;
  // TODO: use db.json file to store data, use json-server to implement api
  // TODO: use redux-toolkit to implement state to fetch and update users, with redux thunk for async actions
  // TODO: use redux slice to generate actions and reducers, create selectors to implement all the logic.
  // TODO: do not use useState to store data locally, use redux store instead
  // TODO: do not filter data locally, use redux selectors instead
  // TODO: use nested selectors to filter data
  // TODO: move all data-related logic (filtering) to redux store


  // TODO: add logic to like user(s)
  // TODO: add logic to delete user(s)
  // TODO: add lotic to filter users
  // TODO: do not focus on styling


  return (
    <li>
      <span>
        {data.firstName} {data.lastName}
      </span>
      {data.isLiked ? "💝" : ""}

        <button onClick={() => handleLike(data.id, { isLike: !data.isLiked })}>Like</button>
        <button onClick={()=>{handleDelete(data.id)}}>Delete</button>
    </li>
  );
};


export function Users() {
    const dispatch = useAppDispatch();
    const filteredUsers = useAppSelector(filteredUsersSelector);
    const filter = useSelector((state: RootState) => state.filters);

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    

    const handleGenderFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedValue = event.target.value;
        dispatch(updateGenderFilter({ ...filter, gender: selectedValue }));
    };
    
    const handleAgeFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedValue = event.target.value;
        dispatch(updateAgeFilter({ ...filter, age: selectedValue }));
    };

    const handleEyeColorFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedValue = event.target.value;
        dispatch(updateEyeColorFilter({ ...filter, eyeColor: selectedValue }));
    };

const handleLike = useCallback((id: string, isLike: boolean) => {
  dispatch(updateUser({ id, data: { isLiked: isLike } }));
}, [dispatch]);

  const handleDelete = useCallback((id: string) => {
    dispatch(deleteUser(id));
  }, []);
    
    return (
        <>
        <form>
            <fieldset className="filter">
            <legend>Filter by gender</legend>


            <label>
                <input type="radio" name="gender" value="female" onChange={handleGenderFilterChange}/> Gender - Female
            </label>


            <label>
                <input type="radio" name="gender" value="male" onChange={handleGenderFilterChange}/> Gender - Male
            </label>


            <label>
                <input type="radio" name="gender" value="all" onChange={handleGenderFilterChange}/> Gender - All
            </label>
            </fieldset>


            <fieldset className="filter">
            <legend>Filter by eye color</legend>


            <label>
                <input type="radio" name="eyeColor" value="green" onChange={handleEyeColorFilterChange}/>
                Eye Color - Green
            </label>


            <label>
                <input type="radio" name="eyeColor" value="brown" onChange={handleEyeColorFilterChange}/>
                Eye Color - Brown
            </label>


            <label>
                <input type="radio" name="eyeColor" value="gray" onChange={handleEyeColorFilterChange}/>
                Eye Color - Gray
            </label>


            <label>
                <input type="radio" name="eyeColor" value="blue" onChange={handleEyeColorFilterChange}/>
                Eye Color - Blue
            </label>


            <label>
                <input type="radio" name="eyeColor" value="amber" onChange={handleEyeColorFilterChange}/>
                Eye Color - Amber
            </label>


            <label>
                <input type="radio" name="eyeColor" value="all" onChange={handleEyeColorFilterChange}/>
                Eye Color - All
            </label>
            </fieldset>

            <fieldset className="filter">
            <legend>Filter by age</legend>

            <label>
                <input type="radio" name="age" value="less20" onChange={handleAgeFilterChange}/>
                Age - Less then 20
            </label>

            <label>
                <input type="radio" name="age" value="20to40" onChange={handleAgeFilterChange}/>
                Age - From 20 to 40
            </label>

            <label>
                <input type="radio" name="age" value="more40" onChange={handleAgeFilterChange}/>
                Age - More than 40
            </label>

            <label>
                <input type="radio" name="age" value="all" onChange={handleAgeFilterChange}/>
                Age - all
            </label>
            </fieldset>
        </form>
        <ul>
            {filteredUsers.map((user) => (
            <User data={user} key={user.id} handleLike={(id, isLike) => handleLike(id, isLike.isLike)} handleDelete={handleDelete}/>
            ))}
        </ul>
        </>
    );
}


export default Users;
