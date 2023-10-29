import { createSelector } from 'reselect';
import { States } from '../constants';
import { rootSelector } from '.';

export const usersSelector = createSelector(rootSelector, state => state[States.UESRS]);
export const isLoading = createSelector(usersSelector, data => data.loading);
export const getGender = createSelector(usersSelector, data => data.genderFilter);
export const getColor = createSelector(usersSelector, data => data.colorFilter);
export const getAge = createSelector(usersSelector, data => data.ageFilter);
export const getUsersSelector = createSelector(usersSelector, data => data.users);

