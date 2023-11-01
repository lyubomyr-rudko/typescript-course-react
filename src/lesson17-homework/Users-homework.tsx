import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { IFilter, IRadioProps, IUserProps } from './types';
import {
    deleteUser,
    fetchUsers,
    filterUser,
    likeUser,
} from './redux/users/operations';
import {
    selectAllUsers,
    selectError,
    selectIsLoading,
} from './redux/users/selectors';
import { useAppDispatch } from './redux/store';

import { UsersList, UserItem, Loader } from './Users-homework.styled';

const User = ({ data }: IUserProps) => {
    const { id, firstName, lastName, gender, eyeColor, age, isLiked } = data;
    const dispatch = useAppDispatch();

    const handleLike = () => {
        dispatch(likeUser({ id, isLiked: !isLiked }));
    };

    const handleDelete = () => {
        dispatch(deleteUser(id));
    };

    return (
        <UserItem>
            <button onClick={handleLike}>
                <i
                    className="fa fa-heart"
                    style={{ color: isLiked ? 'red' : 'white' }}
                ></i>
            </button>
            <button onClick={handleDelete}>Del</button>
            <span>
                {firstName} {lastName},
            </span>
            <span>gender: {gender},</span>
            <span>age: {age},</span>
            <span>eyeColor: {eyeColor}</span>
        </UserItem>
    );
};

function RadioInput({ label, setFilter, ...props }: IRadioProps) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === 'age') {
            switch (value) {
                case 'less20':
                    setFilter((prev) => ({
                        ...prev,
                        age_lte: 20,
                        age_gte: undefined,
                    }));
                    break;

                case '20to40':
                    setFilter((prev) => ({
                        ...prev,
                        age_lte: 40,
                        age_gte: 20,
                    }));
                    break;

                case 'more40':
                    setFilter((prev) => ({
                        ...prev,
                        age_lte: undefined,
                        age_gte: 40,
                    }));
                    break;

                default:
                    setFilter((prev) => ({
                        ...prev,
                        age_lte: undefined,
                        age_gte: undefined,
                    }));
            }
        } else if (value === 'all') {
            setFilter((prev) => ({ ...prev, [name]: undefined }));
        } else {
            setFilter((prev) => ({ ...prev, [name]: value }));
        }
    };

    return (
        <label>
            <input onChange={handleChange} {...props} /> {label}
        </label>
    );
}

function convertFilterToURLSearchParams<T extends IFilter>(filter: T) {
    const params = new URLSearchParams();

    for (const key in filter) {
        if (filter[key]) {
            params.append(key, filter[key] as string);
        }
    }

    return params.toString();
}

function Users() {
    const [filter, setFilter] = useState<IFilter>({});
    const [params, setParams] = useState<string>('');
    const users = useSelector(selectAllUsers);
    const dispatch = useAppDispatch();

    useEffect(() => {
        setParams(convertFilterToURLSearchParams(filter));
    }, [filter]);

    useEffect(() => {
        (async () => {
            if (params.length < 1) {
                dispatch(fetchUsers());
            } else {
                dispatch(filterUser(params));
            }
        })();
    }, [dispatch, params]);

    return (
        <>
            <form>
                <fieldset className="filter">
                    <legend>Filter by gender</legend>
                    <RadioInput
                        setFilter={setFilter}
                        type="radio"
                        name="gender"
                        value="female"
                        label="Gender - Female"
                    />
                    <RadioInput
                        setFilter={setFilter}
                        type="radio"
                        name="gender"
                        value="male"
                        label="Gender - Male"
                    />
                    <RadioInput
                        setFilter={setFilter}
                        type="radio"
                        name="gender"
                        value="all"
                        label="Gender - All"
                    />
                </fieldset>

                <fieldset className="filter">
                    <legend>Filter by eye color</legend>
                    <RadioInput
                        setFilter={setFilter}
                        type="radio"
                        name="eyeColor"
                        label="Eye Color - Green"
                        value="Green"
                    />
                    <RadioInput
                        setFilter={setFilter}
                        type="radio"
                        name="eyeColor"
                        label="Eye Color - Brown"
                        value="Brown"
                    />
                    <RadioInput
                        setFilter={setFilter}
                        type="radio"
                        name="eyeColor"
                        label="Eye Color - Gray"
                        value="Gray"
                    />
                    <RadioInput
                        setFilter={setFilter}
                        type="radio"
                        name="eyeColor"
                        label="Eye Color - Blue"
                        value="Blue"
                    />
                    <RadioInput
                        setFilter={setFilter}
                        type="radio"
                        name="eyeColor"
                        label="Eye Color - Amber"
                        value="Amber"
                    />
                    <RadioInput
                        setFilter={setFilter}
                        type="radio"
                        name="eyeColor"
                        label="Eye Color - All"
                        value="all"
                    />
                </fieldset>

                <fieldset className="filter">
                    <legend>Filter by age</legend>
                    <RadioInput
                        setFilter={setFilter}
                        type="radio"
                        name="age"
                        label="Age - Less then 20"
                        value="less20"
                    />
                    <RadioInput
                        setFilter={setFilter}
                        type="radio"
                        name="age"
                        label="Age - From 20 to 40"
                        value="20to40"
                    />
                    <RadioInput
                        setFilter={setFilter}
                        type="radio"
                        name="age"
                        label="Age - More than 40"
                        value="more40"
                    />
                    <RadioInput
                        setFilter={setFilter}
                        type="radio"
                        name="age"
                        label="Age - all"
                        value="all"
                    />
                </fieldset>
            </form>
            <UsersList>
                {users.map((user) => (
                    <User data={user} key={user.id} />
                ))}
            </UsersList>
        </>
    );
}

const UsersPage = () => {
    const dispatch = useAppDispatch();
    const isLoading = useSelector(selectIsLoading);

    useEffect(() => {
        (async () => {
            dispatch(fetchUsers());
        })();
    }, [dispatch]);

    return (
        <>
            {isLoading && <Loader />}
            <Users />
        </>
    );
};

export default UsersPage;
