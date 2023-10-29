import { useSelector } from 'react-redux';
import { useAppDispatch } from './store/hooks';
import { EGenderFilter, EAgeFilter, EColorFilter, TUSer } from "./store/ts/usersTypes";
import { isLoading, getAge, getColor, getGender, getUsersSelector } from "./store/selectort/usersSelector";
import { setAgeAction,setColorAction, setGenderAction , getUsersAction, deLeteUserAction} from './store/actions/usersAction';

const User = (props: {data:TUSer, deleteUser:(id:number)=>void}) => {
  const {data, deleteUser} = props
  
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
      <button onClick={()=>{deleteUser(data.id)}}>Delete</button>
    </li>
    
  );
};

export function Users() {
  const dispatch = useAppDispatch();
  const age = useSelector(getAge);
  const color = useSelector(getColor);
  const gender = useSelector(getGender);
  const users = useSelector(getUsersSelector);
  const loading = useSelector(isLoading);

  const isGenderChecked = (val:EGenderFilter):boolean=>{
    if(val === gender)return true;
    return false
  }
  const changeGender = (val:EGenderFilter)=>{
    dispatch(setGenderAction(val));
  }
  const isColorChecked = (val:EColorFilter):boolean=>{
    if(val === color)return true;
    return false
  }
  const changeColor = (val:EColorFilter)=>{
    dispatch(setColorAction(val))
  }
  const isAgeChecked = (val:EAgeFilter):boolean=>{
    if(val === age)return true;
    return false
  }
  const changeAge = (val:EAgeFilter)=>{
    dispatch(setAgeAction(val))
  }
  const getUsers = ()=>{
    dispatch(getUsersAction());
  }
  const deleteUser =(id:number)=>{
    dispatch(deLeteUserAction(id));
  }
  return (
    <>
    <button onClick={getUsers}>Get data</button>
      <form>
        <fieldset className="filter">
          <legend>Filter by gender</legend>
          {Object.keys(EGenderFilter).map((key) => (
            <label key={key}>
              <input 
              type="radio" 
              name="gender" 
              value={EGenderFilter[key as keyof typeof EGenderFilter]} 
              checked={isGenderChecked(EGenderFilter[key as keyof typeof EGenderFilter])}
              onChange={()=>{changeGender(EGenderFilter[key as keyof typeof EGenderFilter])}}
              /> 
              Gender - {EGenderFilter[key as keyof typeof EGenderFilter]}
            </label>
          ))}
        </fieldset>

        <fieldset className="filter">
          <legend>Filter by eye color</legend>
          {Object.keys(EColorFilter).map((key) => (
            <label key={key}>
              <input 
              type="radio" 
              name="color" 
              value={EColorFilter[key as keyof typeof EColorFilter]} 
              checked={isColorChecked(EColorFilter[key as keyof typeof EColorFilter])}
              onChange={()=>{changeColor(EColorFilter[key as keyof typeof EColorFilter])}}
              /> 
              Eye Color - {EColorFilter[key as keyof typeof EColorFilter]}
            </label>
          ))}
        </fieldset>

        <fieldset className="filter">
          <legend>Filter by age</legend>
          {Object.keys(EAgeFilter).map((key) => (
            <label key={key}>
              <input 
              type="radio" 
              name="age" 
              value={EAgeFilter[key as keyof typeof EAgeFilter]} 
              checked={isAgeChecked(EAgeFilter[key as keyof typeof EAgeFilter])}
              onChange={()=>{changeAge(EAgeFilter[key as keyof typeof EAgeFilter])}}
              /> 
              Age - {EAgeFilter[key as keyof typeof EAgeFilter]}
            </label>
          ))}
        </fieldset>
      </form>
      {loading?'loading...':
      
        users.length===0?'No data':
          <ul>
            {users.map((user) => (
                  <User data={user} key={user.id} deleteUser={deleteUser}/>
                ))}
          </ul>
        
        
      }
      
    </>
  );
}

export default Users;
