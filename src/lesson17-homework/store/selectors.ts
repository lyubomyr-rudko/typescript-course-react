import {RootState} from "./index.ts";
import {createSelector} from "@reduxjs/toolkit";

export const usersSelector = (state: RootState) => state.users.users
export const filtersSelector = (state: RootState) => state.filters

export const filteredUsersSelector = createSelector(
  [usersSelector, filtersSelector],
  (users, filtersState) => {
    if (filtersState.byGender !== 'all') {
      users = users.filter(user => user.gender === filtersState.byGender)
    }
    if (filtersState.byEyeColor !== 'all') {
      users = users.filter(user => user.eyeColor.toLowerCase() === filtersState.byEyeColor.toLowerCase())
    }
    if (filtersState.byAge === 'less20') {
      users = users.filter(user => user.age < 20)
    }
    if (filtersState.byAge === 'more40') {
      users = users.filter(user => user.age > 40)
    }
    if (filtersState.byAge === '20to40') {
      users = users.filter(user => user.age >= 20 && user.age <= 40)
    }
    return users
  }
)
