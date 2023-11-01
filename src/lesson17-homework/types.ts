import { AxiosError } from 'axios';

export interface IUser {
    firstName: string;
    lastName: string;
    id: number;
    gender: string;
    eyeColor: string;
    age: number;
    isLiked: boolean;
}

export interface IUserProps {
    data: IUser;
}

export type TAxiosError = AxiosError<Error> | null;

export interface IUserState {
    items: IUser[];
    isLoading: boolean;
    error: TAxiosError;
}

export interface IState {
    users: IUserState;
}

export interface IFilter {
    eyeColor?: 'Green' | 'Brown' | 'Gray' | 'Blue' | 'Amber' | 'all';
    gender?: 'male' | 'female' | 'all';
    age_lte?: 20 | 40;
    age_gte?: 20 | 40;
}

export interface IRadioProps {
    setFilter: React.Dispatch<React.SetStateAction<IFilter>>;
    type: string;
    name: string;
    value: string;
    label: string;
}
