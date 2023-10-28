import { createAsyncThunk } from "@reduxjs/toolkit"
import { usersAPI } from "./usersAPI"
import { TUser } from "./TUser"


export const fetchUserById = createAsyncThunk(
    'users/fetchByIdStatus',
    async function(userId: number|string):Promise<TUser | null> {
      const response = await usersAPI.fetchById(userId)
      return response 
    }
)

export const fetchAllUsers = createAsyncThunk(
  'users/fetchAllUsersStatus',
  async function():Promise<TUser[]>{
    const response = await usersAPI.fetchAllUsers()
    return response 
  }
)

export const deleteUserById = createAsyncThunk(
  'users/deleteUserByIdStatus',
  async function(userId: number|string):Promise<number | string | null>{
    const response = await usersAPI.deleteUserById(userId)
    return response ? userId : null
  }
)
