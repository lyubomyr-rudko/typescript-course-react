import React, { useEffect, ChangeEvent, FormEvent } from "react";

interface IUserState {
  count: number;
}
export class UserClass extends React.Component<IUserProps, IUserState> {
  state: IUserState = {
    count: 0,
  };

  handleClick = () => {
    const { data, onDelete } = this.props;

    onDelete(data.id);
  };

  handleIncrement = () => {
    this.setState((state) => ({
      count: state.count + 1,
    }));
  };

  render() {
    const {
      data: { firstName, age, gender },
    } = this.props;
    const { count } = this.state;

    return (
      <li>
        {count}
        <button onClick={this.handleIncrement}>Increment</button>

        <span>{firstName}</span>
        <span>{age}</span>
        <span>{gender}</span>
        <button onClick={this.handleClick}>Delete</button>
      </li>
    );
  }
}

interface IUserProps {
  data: IUser;
  onDelete: (name: number) => void;
  onDuplicate: (name: number) => void;
  onIncreaseAge: (name: number) => void;
}

const User = (props: IUserProps) => {
  const {
    data: { firstName, lastName, age, gender, id },
    onDelete,
    onDuplicate,
    onIncreaseAge,
  } = props;

  const handleDelete = () => {
    onDelete(id);
  };

  const handleDuplicate = () => {
    onDuplicate(id);
  };
  const handleIncreaseAge = () => {
    onIncreaseAge(id);
  };

  return (
    <li>
      <span>
        {firstName} {lastName}
      </span>
      <span>{age}</span>
      <span>{gender}</span>
      <button onClick={handleIncreaseAge}>Add 1 year</button>
      <button onClick={handleDuplicate}>Copy</button>
      <button onClick={handleDelete}>Delete</button>
    </li>
  );
};

const userGenderOptions = [
  {
    label: "Male",
    value: "male",
  },
  {
    label: "Female",
    value: "female",
  },
];

interface IUser {
  firstName: string;
  lastName: string;
  age: number;
  id: number;
  gender: string; //"male" | "female" | (string | {});
}

export function Users() {
  const [usersList, setUsersList] = React.useState<IUser[]>([]);
  const [currentUser, setCurrentUser] = React.useState<IUser | null>(null);
  const [count, setCount] = React.useState(1);

  useEffect(() => {
    console.log("fetching user", count);

    const asyncFetch = async () => {
      const response = await fetch(`http://localhost:3004/users/${count}`);
      const data = await response.json();

      setCurrentUser(data);

      // fetch(`http://localhost:3004/users/${count}`)
      //   .then((response) => response.json())
      //   .then(setCurrentUser);
    };
    asyncFetch();

    return () => {
      console.log("CLEANUP on", count);
    };
  }, [count]);

  const fetchUsers = async () => {
    const response = await fetch("http://localhost:3004/users");
    const data = await response.json();

    setUsersList(data);
  };

  useEffect(() => {
    console.log("fetching users list");
    fetchUsers();

    // fetch("http://localhost:3004/users")
    //   .then((response) => response.json())
    //   .then(setUsersList);

    return () => {
      console.log("Users unmount");
    };
  }, []);

  const handleDelete = (id: number) => {
    const asyncDelete = async () => {
      await fetch(`http://localhost:3004/users/${id}`, {
        method: "DELETE",
      });
      fetchUsers();
    };
    asyncDelete();

    // fetch(`http://localhost:3004/users/${id}`, {
    //   method: "DELETE",
    // }).then(fetchUsers);
  };

  const handleDuplicate = (id: number) => {
    const asyncDuplicate = async () => {
      const response = await fetch(`http://localhost:3004/users/${id}`);
      const user = await response.json();
      const userCopy = { ...user, id: undefined };

      await fetch("http://localhost:3004/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userCopy),
      });

      fetchUsers();
    };
    asyncDuplicate();
  };

  const handleIncreaseAge = (id: number) => {
    const asyncDuplicate = async () => {
      // const response = await fetch(`http://localhost:3004/users/${id}`);
      // const user = await response.json();
      // user.age += 1;

      const user = usersList.find((user) => user.id === id);

      if (!user) {
        fetchUsers();

        throw new Error("User not found");
      }
      user.age += 1;

      await fetch(`http://localhost:3004/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      fetchUsers();
    };
    asyncDuplicate();
  };

  const handleIncreaseAge1 = (id: number) => {
    const asyncDuplicate = async () => {
      const user = usersList.find((user) => user.id === id);

      if (!user) {
        fetchUsers();

        throw new Error("User not found");
      }

      await fetch(`http://localhost:3004/users/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          age: user.age + 1,
        }),
      });

      fetchUsers();
    };
    asyncDuplicate();
  };

  const handleuserAgeChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!currentUser) {
      return;
    }

    const newUserAge = e.target.value;

    setCurrentUser({
      ...currentUser,
      age: Number(newUserAge),
    });
  };

  const handleUserGenderChange = (e: ChangeEvent<HTMLSelectElement>) => {
    if (!currentUser) {
      return;
    }

    const newUserGnder = e.target.value;

    setCurrentUser({
      ...currentUser,
      gender: newUserGnder,
    });
  };

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!currentUser) {
      return;
    }

    await fetch(`http://localhost:3004/users/${currentUser.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(currentUser),
    });

    fetchUsers();
  };

  try {
    return (
      <div>
        {currentUser && (
          <form onSubmit={handleFormSubmit}>
            <input
              type="number"
              value={currentUser.age}
              onChange={handleuserAgeChange}
            />
            <select
              value={currentUser.gender}
              onChange={handleUserGenderChange}
            >
              {userGenderOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <button type="submit">Submit</button>
          </form>
        )}

        <button onClick={() => setCount(count + 1)}>Increment</button>
        <div>{count}</div>
        {currentUser && (
          <User
            data={currentUser}
            key={currentUser.id}
            onDelete={handleDelete}
            onDuplicate={handleDuplicate}
            onIncreaseAge={handleIncreaseAge}
          />
        )}

        <br />
        <br />

        <ul>
          {usersList.map((user) => (
            <User
              data={user}
              key={user.id}
              onDelete={handleDelete}
              onDuplicate={handleDuplicate}
              onIncreaseAge={handleIncreaseAge1}
            />
          ))}
        </ul>
      </div>
    );
  } catch (e) {
    console.log(e);
  } finally {
    console.log("Users render", currentUser, usersList, count);
  }
}

export default Users;
