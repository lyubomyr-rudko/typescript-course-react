import { createReducer } from '@reduxjs/toolkit';
import { EUsersActionTypes, TUserState, EGenderFilter, EColorFilter, EAgeFilter, TUSer } from '../ts/usersTypes';

const initialState: TUserState = {
  genderFilter: EGenderFilter.ALL,
  colorFilter: EColorFilter.ALL,
  ageFilter: EAgeFilter.ALL,
  users:[],
  loading:true,
};

export const usersReducer = createReducer(initialState, {
  [EUsersActionTypes.LOADING]: (state, action: { payload: boolean }) => {
    state.loading = action.payload;
  },
  [EUsersActionTypes.CHANGE_AGE]: (state, action: { payload: EAgeFilter }) => {
    state.ageFilter = action.payload;
  },
  [EUsersActionTypes.CHANGE_COLOR]: (state, action: { payload: EColorFilter }) => {
    state.colorFilter = action.payload;
  },
  [EUsersActionTypes.CHANGE_GENDER]: (state, action: { payload: EGenderFilter }) => {
    state.genderFilter = action.payload;
  },
  [EUsersActionTypes.SET_USERS]: (state, action: { payload: TUSer[] }) => {
    state.users = action.payload;
  },
  
});
export default usersReducer;
