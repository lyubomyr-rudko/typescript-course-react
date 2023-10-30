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
  const genders = ["female", "male", "all"];
  const eyeColors = ["Green", "Brown", "Gray", "Blue", "Amber", "all"];
  const ages = ["less20", "20to40", "more40", "all"];

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
              {genders.map((gender) => (
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value={gender}
                    onChange={handleFilterByGender}
                  />
                  Gender - {gender}
                </label>
              ))}
            </fieldset>
            <fieldset className="filter">
              <legend>Filter by eye color</legend>
              {eyeColors.map((color) => (
                <label>
                  <input
                    type="radio"
                    name="eyeColor"
                    value={color}
                    onChange={handleFilterByEyeColor}
                  />
                  Eye Color - {color}
                </label>
              ))}
            </fieldset>
            <fieldset className="filter">
              <legend>Filter by age</legend>
              {ages.map((age) => (
                <label>
                  <input type="radio" name="age" value={age} onChange={handleFilterByEyAge} />
                  Age - {age}
                </label>
              ))}
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
