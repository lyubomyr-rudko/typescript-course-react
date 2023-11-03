import { createAsyncThunk } from '@reduxjs/toolkit';
import * as users from './users';

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const data = await users.fetchData();
  return data;
});

export const updateUser = createAsyncThunk('users/updateUser', async (payload: { id: string; body: { isLike: boolean } }) => {
  const data = await users.updateData(payload.id, payload.body);
  return data;
});

export const deleteUser = createAsyncThunk('users/deleteUser', async (id: string) => {
  await users.deleteData(id);
  return id;
});