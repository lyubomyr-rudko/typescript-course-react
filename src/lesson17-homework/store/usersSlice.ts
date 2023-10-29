import {ActionReducerMapBuilder, AnyAction, createSlice, PayloadAction, Slice} from "@reduxjs/toolkit";
import {GetUsersResponse, IUser} from "../types.ts";
import {getAllUsers} from "./thunkActions.ts";

interface IUserState {
  isLoading: boolean,
  error: null | string,
  users: IUser[]
}

const initialState: IUserState = {
  isLoading: true,
  error: null,
  users: []
}
const usersSlice: Slice<IUserState> = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder:ActionReducerMapBuilder<IUserState>) => {
    builder.addCase(getAllUsers.pending, (state) => {
      state.isLoading = true
      state.error = null
    })
    builder.addCase(getAllUsers.fulfilled, (state, {payload}:PayloadAction<GetUsersResponse>) => {
      state.isLoading = false
      state.users = payload
    })
    builder.addCase(getAllUsers.rejected, (state, {payload}: AnyAction) => {
      state.isLoading = false
      state.users = []
      state.error = payload
    })
  }
})

export default usersSlice.reducer
