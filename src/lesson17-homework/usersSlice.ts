import { createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';
import { IUser } from './types'; 
import { fetchData, updateData, deleteData } from './users';

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  return fetchData(); 
});

export const updateUserAsync = createAsyncThunk(
  'users/updateUser',
    async ({ id, data }: { id: string; data: Partial<IUser> }) => {
        return updateData(id, {isLike: true});
  }
);

export const deleteUserAsync = createAsyncThunk('users/deleteUser', async (id: string) => {
  return deleteData(id); 
});

const usersSlice = createSlice({
  name: 'users',
  initialState: [] as IUser[],
  reducers: {
    setUsers: (state, action: PayloadAction<IUser[]>) => {
      return action.payload;
    },
    updateUser: (state, action: PayloadAction<{ id: string; data: Partial<IUser> }>) => {
      const { id, data } = action.payload;
      const userToUpdate = state.find((user) => user.id === id);
      if (userToUpdate) {
        Object.assign(userToUpdate, data);
      }
    },
    deleteUser: (state, action: PayloadAction<string>) => {
      return state.filter((user) => user.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.fulfilled, (state, action) => {
        return action.payload; 
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        const updatedUser = action.payload;
        const userIndex = state.findIndex((user) => user.id === updatedUser.id);
          if (userIndex !== -1) {
            state[userIndex] = updatedUser;
          }
        })

  },
});

export const { setUsers, updateUser, deleteUser } = usersSlice.actions;
export default usersSlice.reducer;
