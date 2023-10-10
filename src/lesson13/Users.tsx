import React from "react";
// import "./Users.css";
import styles from "./Users.module.css";
import { Danger, Block } from "./Users.styled";

// const styles = {
//   danger: "danger--asdfasdf-asdf12312",
//   info: "info--asdfasdf-asdf12312",
// }

interface IUserState {
  count: number;
}
export class UserClass extends React.Component<IUserProps, IUserState> {
  state: IUserState = {
    count: 0,
  };

  handleClick = () => {
    const { data, onDelete } = this.props;

    onDelete(data.name);
  };

  handleIncrement = () => {
    this.setState((state) => ({
      count: state.count + 1,
    }));
  };

  render() {
    const { data } = this.props;
    const { count } = this.state;

    return (
      <li>
        {count}
        <button onClick={this.handleIncrement}>Increment</button>

        <span>{data.name}</span>
        <span>{data.age}</span>
        {data.idCardNumber && <span>{data.idCardNumber}</span>}
        <button onClick={this.handleClick}>Delete</button>
      </li>
    );
  }
}
type TUser = {
  firstName: string;
  lastName: string;
};

interface IFormProps {
  children: (data: TUser) => React.ReactNode;
  onSubmit: (data: TUser) => void;
}

const Form = (props: IFormProps) => {
  const { onSubmit } = props;
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = {
      firstName: "John",
      lastName: "Doe",
    };
    onSubmit(data);
  };
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState<TUser | null>(null);

  React.useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    setData({
      firstName: "John",
      lastName: "Doe",
    });
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      {!loading && data && props.children(data)}
    </form>
  );
};

interface IUserProps {
  data: {
    name: string;
    age: number;
    idCardNumber?: string;
  };
  onDelete: (name: string) => void;
}

const User = (props: IUserProps) => {
  const { data, onDelete } = props;

  const handleClick = () => {
    onDelete(data.name);
  };
  const [visible, setVisible] = React.useState(false);
  const [count, setCount] = React.useState<number | null>(null);
  console.log("User111", count);

  const handleIncrement = () => {
    setCount((count) => (count ? count + 1 : 1));
    // setCount((count) => (count ? count + 1 : 1));
    // setCount((count) => (count ? count + 1 : 1));
    setVisible(true);
    // setCount(count ? count + 1 : 1);
    // setCount(count ? count + 1 : 1);
    // setCount(count ? count + 1 : 1);
  };

  const handleReset = () => {
    setCount(0);
  };

  return (
    <li>
      <div className={styles.error}>Error</div>

      <div style={{ color: count === 1 ? "green" : "red" }}>
        {visible && `1 > ${count}`}
      </div>

      <div className={count === 1 ? styles.info : styles.danger}>
        {visible && `2 > ${count}`}
      </div>

      <button onClick={handleIncrement}>Increment</button>
      <button onClick={handleReset}>Reset</button>
      <span>{data.name}</span>
      <span>{data.age}</span>
      {data.idCardNumber && <span>{data.idCardNumber}</span>}
      <button onClick={handleClick}>Delete</button>
    </li>
  );
};

export function Users() {
  const users = [
    {
      name: "John",
      age: 10,
    },
    {
      name: "Bob",
      age: 10,
    },
    {
      name: "Duglas",
      age: 20,
      idCardNumber: "123456789",
    },
    {
      name: "Max",
      age: 10,
    },
  ];

  // const u1 = <User data={users[0]} />;
  // const u2 = <User data={users[1]} />;
  // const u3 = <User data={users[2]} />;
  // const u4 = <User data={users[3]} />;
  // const listOld = [u1, u2, u3, u4];
  // console.log(listOld);

  // const list = users.map((user) => <User data={user} />);

  // return <ul>{list}</ul>;

  const handleDelete = (name: string) => {
    console.log("Deleting", name);
  };

  return (
    <ul>
      <UserClass data={users[0]} onDelete={handleDelete} />
      <br />
      <Form onSubmit={console.log}>
        {() => (
          <>
            <input type="text" />
            <input type="text" />
            <button>Submit</button>
          </>
        )}
      </Form>

      <Block invalid title="Hello">
        My Error
      </Block>
      <Block title="Hello">My Info</Block>
      <Danger>My Danger</Danger>

      {/* <Widget
        haeader={<div>header</div>}
        footer={<div>footer</div>}
        body={<div>body</div>}
      /> */}

      {users.map((user) => (
        <User data={user} key={user.name} onDelete={handleDelete} />
      ))}
    </ul>
  );
}

export default Users;
