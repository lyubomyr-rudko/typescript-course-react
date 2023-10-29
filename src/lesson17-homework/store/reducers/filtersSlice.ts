import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IFiltersState {
  age: string;
  eyeColor: string;
  gender: string;
}

const initialState: IFiltersState = {
  age: 'all',
  eyeColor: 'all',
  gender: 'all',
};

export const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setFilters(state, action: PayloadAction<IFiltersState>) {
      const { age, eyeColor, gender } = action.payload;
      state.age = age;
      state.eyeColor = eyeColor;
      state.gender = gender;
    }
  }
})

export const { setFilters } = filtersSlice.actions;

export default filtersSlice.reducer;


