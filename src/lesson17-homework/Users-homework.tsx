import { deleteUserById, fetchAllUsers } from "./store/Users/usersReducers";
import { ChangeEvent, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { TUser } from "./store/Users/TUser";
import { likeUser, updateUserSettings } from "./store/Users/usersSlice";
import { filteredUsers } from "./store/Users/usersSelectors";

interface IUserProps {
  data: TUser,
  handleDelete:(userId:string|number)=>void,
  handleLike:(userId:string|number)=>void
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
  // TODO: do not focus on styling (HURRAY!)

  return (
    <li>
      <span>
        {data.firstName} {data.lastName}
      </span>
      {data.isLiked ? "<3" : ""}

      <button onClick={()=>{handleLike(data.id)}}>Like</button>
      <button onClick={()=>{handleDelete(data.id)}}>Delete</button>
    </li>
  );
};


export function Users() {
  const users = useAppSelector(filteredUsers)
  const filterSettings = useAppSelector(state => state.users.filterSettings)
  const dispatch = useAppDispatch()

  useEffect(()=>{
    async function initUsersApp() {
      await dispatch(fetchAllUsers())
    }
    initUsersApp()
  }, [dispatch])

  async function handleDelete(userId:string|number){
    await dispatch(deleteUserById(userId))
  }

  function handleLike(userId:string|number){
    dispatch(likeUser(userId))
  }

  function handleFilterBySetting(e:ChangeEvent<HTMLInputElement>){
    const { name, value } = e.target;
    dispatch(updateUserSettings({...filterSettings, [name]:value}))
  }

  return (
    <>
      <form>
        <fieldset className="filter">
          <legend>Filter by gender</legend>

          <label>
            <input type="radio" name="gender" value="female" onChange={handleFilterBySetting}/> Gender - Female
          </label>

          <label>
            <input type="radio" name="gender" value="male" onChange={handleFilterBySetting}/> Gender - Male
          </label>

          <label>
            <input type="radio" name="gender" value="all" onChange={handleFilterBySetting}/> Gender - All
          </label>
        </fieldset>

        <fieldset className="filter">
          <legend>Filter by eye color</legend>

          <label>
            <input type="radio" name="eyeColor" value="green" onChange={handleFilterBySetting}/>
            Eye Color - Green
          </label>

          <label>
            <input type="radio" name="eyeColor" value="brown" onChange={handleFilterBySetting}/>
            Eye Color - Brown
          </label>

          <label>
            <input type="radio" name="eyeColor" value="gray" onChange={handleFilterBySetting}/>
            Eye Color - Gray
          </label>

          <label>
            <input type="radio" name="eyeColor" value="blue" onChange={handleFilterBySetting}/>
            Eye Color - Blue
          </label>

          <label>
            <input type="radio" name="eyeColor" value="amber" onChange={handleFilterBySetting}/>
            Eye Color - Amber
          </label>

          <label>
            <input type="radio" name="eyeColor" value="all" onChange={handleFilterBySetting}/>
            Eye Color - All
          </label>
        </fieldset>

        <fieldset className="filter">
          <legend>Filter by age</legend>

          <label>
            <input type="radio" name="age" value="less20" onChange={handleFilterBySetting}/>
            Age - Less then 20
          </label>

          <label>
            <input type="radio" name="age" value="20to40" onChange={handleFilterBySetting}/>
            Age - From 20 to 40
          </label>

          <label>
            <input type="radio" name="age" value="more40" onChange={handleFilterBySetting}/>
            Age - More than 40
          </label>

          <label>
            <input type="radio" name="age" value="all" onChange={handleFilterBySetting}/>
            Age - all
          </label>
        </fieldset>
      </form>

      <ul>
        {users.map((user) => (
          <User handleLike={handleLike} handleDelete={handleDelete} data={user} key={user.id} />
        ))}
      </ul>
    </>
  );
}

export default Users;
