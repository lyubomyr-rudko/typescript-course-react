import { createSelector } from "@reduxjs/toolkit";

import { RootState } from "./index";

const users = (state: RootState) => state.usersReducer.users;
const filters = (state: RootState) => state.filtersReducer;

export const filteredUsersSelector = createSelector(
  [users, filters], (users, filters) => {
    if (filters.gender !== 'all') {
      users = users.filter(user => user.gender === filters.gender)
    }
    if (filters.eyeColor !== 'all') {
      users = users.filter(user => user.eyeColor.toLowerCase() === filters.eyeColor.toLowerCase())
    }
    if (filters.age === 'less20') {
      users = users.filter(user => user.age < 20)
    }
    if (filters.age === 'more40') {
      users = users.filter(user => user.age > 40)
    }
    if (filters.age === '20to40') {
      users = users.filter(user => user.age >= 20 && user.age <= 40)
    }
    return users
  }
);
