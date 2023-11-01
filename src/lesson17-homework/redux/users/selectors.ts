import { IState } from '../../types';

export const selectAllUsers = (state: IState) => state.users.items;

export const selectIsLoading = (state: IState) => state.users.isLoading;

export const selectError = (state: IState) => state.users.error;
