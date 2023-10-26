import { useEffect, ChangeEvent } from "react";
import { RootState, useAppDispatch } from "./state/store";
import {
  deleteUser,
  fetchUsersList,
  likeUser,
  selectFilteredUsers,
  setFilterByAge,
  setFilterByEyeColor,
  setFilterByGender,
} from "./state/slices/usersListSlice";
import { useSelector } from "react-redux";
import { selectLoadingState, setLoadingState } from "./state/slices/loaidingStateSlice";

const emptyUser = {
  id: 0,
  position: 0,
  isLiked: false,
  firstName: "",
  lastName: "",
  maidenName: "",
  age: 0,
  gender: "",
  email: "",
  phone: "",
  username: "",
  password: "",
  birthDate: "",
  image: "",
  bloodGroup: "",
  height: 0,
  weight: 0,
  eyeColor: "",
  hair: {
    color: "",
    type: "",
  },
  domain: "",
  ip: "",
  address: {
    address: "",
    city: "",
    coordinates: {
      lat: 0,
      lng: 0,
    },
    postalCode: "",
    state: "",
  },
  macAddress: "",
  university: "",
  bank: {
    cardExpire: "",
    cardNumber: "",
    cardType: "",
    currency: "",
    iban: "",
  },
  company: {
    address: {
      address: "",
      city: "",
      coordinates: {
        lat: 0,
        lng: 0,
      },
      postalCode: "",
      state: "",
    },
    department: "",
    name: "",
    title: "",
  },
  ein: "",
  ssn: "",
  userAgent: "",
};
interface IUserProps {
  data: TUser;
}
export type TUser = typeof emptyUser;

const User = (props: IUserProps) => {
  const { data } = props;
  const dispatch = useAppDispatch();

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
      <button onClick={() => dispatch(deleteUser(data))}>Delete user</button>
      <button
        style={{ backgroundColor: data.isLiked ? "pink" : "transparent" }}
        onClick={() => dispatch(likeUser(data))}
      >
        Like
      </button>
    </li>
  );
};

export function Users() {
  const dispatch = useAppDispatch();
  const loading = useSelector((state: RootState) => selectLoadingState(state));
  const filteredUsers = useSelector((state: RootState) => selectFilteredUsers(state));
  const later = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  useEffect(() => {
    async function loadUsers() {
      try {
        dispatch(setLoadingState());
        dispatch(fetchUsersList());
        await later(1000);
      } catch (e) {
        console.error(e);
        alert("something go wrong");
      } finally {
        dispatch(setLoadingState());
      }
    }
    loadUsers();
  }, [dispatch]);

  function handleFilterByGender(e: ChangeEvent<HTMLInputElement>) {
    dispatch(setFilterByGender(e.target.value));
  }
  function handleFilterByEyeColor(e: ChangeEvent<HTMLInputElement>) {
    dispatch(setFilterByEyeColor(e.target.value));
  }
  function handleFilterByEyAge(e: ChangeEvent<HTMLInputElement>) {
    dispatch(setFilterByAge(e.target.value));
  }
  return (
    <>
      {loading ? (
        <div>Loading</div>
      ) : (
        <>
          <form style={{ margin: 20 }}>
            <fieldset className="filter">
              <legend>Filter by gender</legend>

              <label>
                <input type="radio" name="gender" value="female" onChange={handleFilterByGender} />
                Gender - Female
              </label>

              <label>
                <input type="radio" name="gender" value="male" onChange={handleFilterByGender} />
                Gender - Male
              </label>

              <label>
                <input type="radio" name="gender" value="all" onChange={handleFilterByGender} />
                Gender - All
              </label>
            </fieldset>
            <fieldset className="filter">
              <legend>Filter by eye color</legend>

              <label>
                <input
                  type="radio"
                  name="eyeColor"
                  value="Green"
                  onChange={handleFilterByEyeColor}
                />
                Eye Color - Green
              </label>

              <label>
                <input
                  type="radio"
                  name="eyeColor"
                  value="Brown"
                  onChange={handleFilterByEyeColor}
                />
                Eye Color - Brown
              </label>

              <label>
                <input
                  type="radio"
                  name="eyeColor"
                  value="Gray"
                  onChange={handleFilterByEyeColor}
                />
                Eye Color - Gray
              </label>

              <label>
                <input
                  type="radio"
                  name="eyeColor"
                  value="Blue"
                  onChange={handleFilterByEyeColor}
                />
                Eye Color - Blue
              </label>

              <label>
                <input
                  type="radio"
                  name="eyeColor"
                  value="Amber"
                  onChange={handleFilterByEyeColor}
                />
                Eye Color - Amber
              </label>

              <label>
                <input type="radio" name="eyeColor" value="all" onChange={handleFilterByEyeColor} />
                Eye Color - All
              </label>
            </fieldset>
            <fieldset className="filter">
              <legend>Filter by age</legend>

              <label>
                <input type="radio" name="age" value="less20" onChange={handleFilterByEyAge} />
                Age - Less then 20
              </label>

              <label>
                <input type="radio" name="age" value="20to40" onChange={handleFilterByEyAge} />
                Age - From 20 to 40
              </label>

              <label>
                <input type="radio" name="age" value="more40" onChange={handleFilterByEyAge} />
                Age - More than 40
              </label>

              <label>
                <input type="radio" name="age" value="all" onChange={handleFilterByEyAge} />
                Age - all
              </label>
            </fieldset>
          </form>
          <div style={{ margin: 20 }}>
            <h2>All users</h2>
            <ul>
              {filteredUsers.map((user) => (
                <User data={user} key={user.id} />
              ))}
            </ul>
            <hr></hr>
          </div>
        </>
      )}
    </>
  );
}

export default Users;
