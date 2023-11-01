import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { IFilter, IUser } from '../../types';

axios.defaults.baseURL = 'http://localhost:3000/';

export const fetchUsers = createAsyncThunk<IUser[]>(
    'USERS/FETCH_USERS',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get('/users');
            return response.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const likeUser = createAsyncThunk<IUser, Pick<IUser, 'id' | 'isLiked'>>(
    'USERS/LIKE_USER',
    async ({ id, isLiked }, { rejectWithValue }) => {
        try {
            const response = await axios.patch(`/users/${id}`, { isLiked });
            return response.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const deleteUser = createAsyncThunk<IUser['id'], IUser['id']>(
    'USERS/DELETE_USER',
    async (id, { rejectWithValue }) => {
        try {
            await axios.delete(`/users/${id}`);

            return id;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const filterUser = createAsyncThunk<IUser[], string>(
    'USERS/FILTER_USERS',
    async (params, { rejectWithValue }) => {
        try {
            const response = await axios.get(`/users?${params}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);
