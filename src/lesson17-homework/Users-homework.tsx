interface IUserProps {
  // TOOD: feel free to update this interface
  data: {
    firstName: string;
    lastName: string;
    id: string;
  };
}

const User = (props: IUserProps) => {
  const { data } = props;
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
    </li>
  );
};

export function Users() {
  const users: IUserProps["data"][] = [
    { firstName: "John", lastName: "Doe", id: "1" },
    { firstName: "Jane", lastName: "Doe", id: "2" },
    { firstName: "John", lastName: "Smith", id: "3" },
  ];

  return (
    <>
      <form>
        <fieldset className="filter">
          <legend>Filter by gender</legend>

          <label>
            <input type="radio" name="gender" value="female" /> Gender - Female
          </label>

          <label>
            <input type="radio" name="gender" value="male" /> Gender - Male
          </label>

          <label>
            <input type="radio" name="gender" value="all" /> Gender - All
          </label>
        </fieldset>

        <fieldset className="filter">
          <legend>Filter by eye color</legend>

          <label>
            <input type="radio" name="eyeColor" value="green" />
            Eye Color - Green
          </label>

          <label>
            <input type="radio" name="eyeColor" value="brown" />
            Eye Color - Brown
          </label>

          <label>
            <input type="radio" name="eyeColor" value="gray" />
            Eye Color - Gray
          </label>

          <label>
            <input type="radio" name="eyeColor" value="blue" />
            Eye Color - Blue
          </label>

          <label>
            <input type="radio" name="eyeColor" value="amber" />
            Eye Color - Amber
          </label>

          <label>
            <input type="radio" name="eyeColor" value="all" />
            Eye Color - All
          </label>
        </fieldset>

        <fieldset className="filter">
          <legend>Filter by age</legend>

          <label>
            <input type="radio" name="age" value="less20" />
            Age - Less then 20
          </label>

          <label>
            <input type="radio" name="age" value="20to40" />
            Age - From 20 to 40
          </label>

          <label>
            <input type="radio" name="age" value="more40" />
            Age - More than 40
          </label>

          <label>
            <input type="radio" name="age" value="all" />
            Age - all
          </label>
        </fieldset>
      </form>
      <ul>
        {users.map((user) => (
          <User data={user} key={user.id} />
        ))}
      </ul>
    </>
  );
}

export default Users;
