import { PayloadAction, createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { TUser } from "../../Users-homework";

export const fetchUsersList = createAsyncThunk("usersList/fetch", async () => {
  const response = await fetch("http://localhost:3004/users");
  const data = await response.json();
  return data;
});

export const deleteUser = createAsyncThunk(
  "usersList/delete",
  async (user: TUser, { dispatch }) => {
    await fetch(`http://localhost:3004/users/${user.id}`, {
      method: "DELETE",
    });
    dispatch(fetchUsersList());
  }
);

export const likeUser = createAsyncThunk("userList/like", async (user: TUser, { dispatch }) => {
  await fetch(`http://localhost:3004/users/${user.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      isLiked: !user.isLiked,
    }),
  });
  dispatch(fetchUsersList());
});

type TUsersList = {
  usersList: TUser[];
  filters: { age: string; gender: string; eyeColor: string };
  loading: boolean;
  failed: boolean;
};
const initialState: TUsersList = {
  usersList: [],
  filters: { age: "all", gender: "all", eyeColor: "all" },
  loading: true,
  failed: false,
};

export const usersList = createSlice({
  name: "usersList",
  initialState,
  reducers: {
    setFilterByGender: (state, action: PayloadAction<string>) => {
      state.filters.gender = action.payload;
    },
    setFilterByEyeColor: (state, action: PayloadAction<string>) => {
      state.filters.eyeColor = action.payload;
    },
    setFilterByAge: (state, action: PayloadAction<string>) => {
      state.filters.age = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsersList.fulfilled, (state, action) => {
        state.usersList = action.payload;
        state.loading = false;
        state.failed = false;
      })
      .addCase(fetchUsersList.pending, (state) => {
        state.loading = true;
        state.failed = false;
      })
      .addCase(fetchUsersList.rejected, (state) => {
        state.loading = false;
        state.failed = true;
        state.usersList = [];
      });
  },
});
export const { setFilterByGender, setFilterByEyeColor, setFilterByAge } = usersList.actions;
export default usersList.reducer;

export const selectUsersList = (state: RootState) => state.usersList.usersList;
export const selectorFilter = (state: RootState) => state.usersList.filters;

export const selectFilteredUsers = createSelector(
  selectUsersList,
  selectorFilter,
  (users, filters) =>
    users
      .filter((user) => (filters.gender === "all" ? user : user.gender === filters.gender))
      .filter((user) => (filters.eyeColor === "all" ? user : user.eyeColor === filters.eyeColor))
      .filter((user) =>
        filters.age === "less20"
          ? user.age < 20
          : filters.age === "20to40"
          ? user.age >= 20 && user.age <= 40
          : filters.age === "more40"
          ? user.age > 40
          : filters.age === "all"
          ? user
          : null
      )
);
