import { IState } from '../../types';

export const selectAllUsers = (state: IState) => state.users.items;
