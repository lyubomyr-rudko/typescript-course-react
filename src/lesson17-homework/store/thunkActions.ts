import {createAsyncThunk} from "@reduxjs/toolkit";
import {deleteUser, getUsers, likeUser} from "../api.ts";

export const getAllUsers = createAsyncThunk(
  'users/getAllUsers',
  async (_, { rejectWithValue })=> {
    try {
      const response = await getUsers()
      return response.data
    }
    catch (e) {
      return rejectWithValue(e)
    }
  }
)

export const deleteUserById = createAsyncThunk(
  'users/deleteUserById',
  async (id:number, { rejectWithValue, dispatch })=> {
    try {
      await deleteUser(id)
      dispatch(getAllUsers())
    }
    catch (e) {
      return rejectWithValue(e)
    }
  }
)

type TLikePayload = {
  id: number
  likes: number
}
export const likeUserById = createAsyncThunk(
  'users/likeUserById',
  async ({ id, likes }: TLikePayload, { rejectWithValue, dispatch })=> {
    try {
      await likeUser(id, likes)
      dispatch(getAllUsers())
    }
    catch (e) {
      return rejectWithValue(e)
    }
  }
)
