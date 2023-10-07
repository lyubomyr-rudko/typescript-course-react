import React from 'react';

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

    const [count, setCount] = React.useState(0);

    const handleIncrement = () => {
        setCount((count) => count + 1);
    };

    const handleReset = () => {
        setCount(0);
    };

    return (
        <li>
            {count}
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
            name: 'John',
            age: 10,
        },
        {
            name: 'Bob',
            age: 10,
        },
        {
            name: 'Duglas',
            age: 20,
            idCardNumber: '123456789',
        },
        {
            name: 'Max',
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
        console.log('Deleting', name);
    };

    return (
        <ul>
            <UserClass data={users[0]} onDelete={handleDelete} />
            <br />

            {users.map((user) => (
                <User data={user} key={user.name} onDelete={handleDelete} />
            ))}
        </ul>
    );
}

export default Users;
