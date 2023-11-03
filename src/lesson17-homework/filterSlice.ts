import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FilterState {
  gender: string;
  eyeColor: string;
  age: string;
}

const initialState: FilterState = {
  gender: 'all',
  eyeColor: 'all',
  age: 'all',
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
   updateGenderFilter: (state, action: PayloadAction<{ gender: string }>) => {
      state.gender = action.payload.gender;
    },
    updateEyeColorFilter: (state, action: PayloadAction<{ eyeColor: string }>) => {
      state.eyeColor = action.payload.eyeColor;
    },
    updateAgeFilter: (state, action: PayloadAction<{ age: string }>) => {
      state.age = action.payload.age;
    },
  },
});

export const {
  updateGenderFilter,
  updateEyeColorFilter,
  updateAgeFilter,
} = filterSlice.actions;
export default filterSlice.reducer;
