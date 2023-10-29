import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { TUser } from "../../../users-data"
import { fetchUsers, updateUser, deleteUser } from "./ActionCreators";

interface IUsersState {
  users: TUser[];
  filteredUsers: TUser[];
  isLoading: boolean;
  error: string;
}

const initialState: IUsersState = {
  users: [],
  filteredUsers: [],
  isLoading: false,
  error: ''
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchUsers.fulfilled.type]: (state, action: PayloadAction<TUser[]>) => {
      state.isLoading = false;
      state.error = '';
      state.users = action.payload;
    },
    [fetchUsers.pending.type]: (state) => {
      state.isLoading = true;
    },
    [fetchUsers.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [updateUser.fulfilled.type]: (state, action: PayloadAction<TUser>) => {
      const findIndex = state.users.findIndex(user => user.id === action.payload.id);
      state.users[findIndex] = action.payload;
    },
    [deleteUser.fulfilled.type]: (state, action: PayloadAction<number>) => {
      const newUsers = state.users.filter(user => user.id !== action.payload);
      state.users = newUsers;
    }
  }
})

export default usersSlice.reducer;