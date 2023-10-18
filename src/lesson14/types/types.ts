import { ValidationError } from 'yup';

export type TUser = {
    id: number;
    firstName: string;
    lastName: string;
    gender: string;
    birthDate: string;
    position: number;
    email: string;
    hair: {
        color: string;
        type?: string;
    };
};

export interface IUserProps {
    data: TUser;
    indx: number;
}
export interface IUsersProps {
    data: TUser[];
}

export interface IUsersContext {
    users: TUser[];
    usersCount: number;
    isLoading: boolean;
    handleSwap: (id: number, position: number, n: 1 | -1) => void;
    handleAddUser: (formData: Omit<TUser, 'id'>) => void;
}

export interface IUsersProvaiderProps {
    children: React.ReactNode;
}

export interface IInputProps {
    label: string;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    value: string;
    type: string;
    name: string;
}

export interface IErrorMessagesProps {
    errors: ValidationError | null;
}
