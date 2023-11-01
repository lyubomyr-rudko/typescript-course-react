import { createSlice, isAnyOf } from '@reduxjs/toolkit';

import { deleteUser, fetchUsers, filterUser, likeUser } from './operations';
import { TAxiosError, IUserState } from '../../types';

const initialState: IUserState = {
    items: [],
    isLoading: false,
    error: null,
};

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(likeUser.fulfilled, (state: IUserState, { payload }) => {
                const index = state.items.findIndex(
                    (item) => item.id === payload.id
                );
                state.items.splice(index, 1, payload);
            })
            .addCase(deleteUser.fulfilled, (state: IUserState, { payload }) => {
                const index = state.items.findIndex(
                    (item) => item.id === payload
                );
                console.log({ index });

                state.items.splice(index, 1);
            })
            .addMatcher(
                isAnyOf(fetchUsers.fulfilled, filterUser.fulfilled),
                (state: IUserState, { payload }) => {
                    state.items = payload;
                }
            )
            .addMatcher(
                isAnyOf(
                    fetchUsers.pending,
                    filterUser.pending,
                    likeUser.pending,
                    deleteUser.pending
                ),
                (state) => {
                    state.isLoading = true;
                }
            )
            .addMatcher(
                isAnyOf(
                    fetchUsers.fulfilled,
                    filterUser.fulfilled,
                    likeUser.fulfilled,
                    deleteUser.fulfilled
                ),
                (state) => {
                    state.error = null;
                    state.isLoading = false;
                }
            )
            .addMatcher(
                isAnyOf(
                    filterUser.rejected,
                    fetchUsers.rejected,
                    likeUser.rejected,
                    deleteUser.rejected
                ),
                (state, action) => {
                    state.error = action.error as TAxiosError;
                    state.isLoading = false;
                }
            );
    },
});

export const usersReducer = usersSlice.reducer;
