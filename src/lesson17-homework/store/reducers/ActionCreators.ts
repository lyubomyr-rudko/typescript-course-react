import { TUser } from '../../../users-data';
import { fetchData, updateData, deleteData } from '../../api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchUsers = createAsyncThunk(
  'users/fetch',
  async () => {
    const users: TUser[] = await fetchData();
    return users;
  }
);

export const updateUser = createAsyncThunk(
  'users/update',
  async (params: { id: number, body: { isLike: boolean } }) => {
    const users: TUser = await updateData(params.id, params.body);
    return users;
  }
);

export const deleteUser = createAsyncThunk(
  'users/delete',
  async (id: number) => {
    const userId = await deleteData(id);
    return userId;
  }
)
