import { AppDispatch, GetRootState } from '../store';
import { EAgeFilter, EColorFilter, EGenderFilter, TUSer, EAgeFilterQuery } from '../ts/usersTypes';
import { EUsersActionTypes } from '../ts/usersTypes';
import { getAge, getColor, getGender } from '../selectort/usersSelector';

export const getUsersAction = () => {
  return async (dispatch: AppDispatch, getState: GetRootState) => {
    const age = getAge(getState());
    const color = getColor(getState());
    const gender = getGender(getState());
    await dispatch(usersLoaderAction(true));
    const filter:string[] = [];
    if(age !== EAgeFilter.ALL){
      filter.push (`${EAgeFilterQuery[age]}`);
    }
    if(color !== EColorFilter.ALL){
      filter.push (`eyeColor=${color}`);
    }
    if(gender !== EGenderFilter.ALL){
      filter.push (`gender=${gender}`);
    }
    const sorteRow = filter.join('&')
    const response = await fetch(`http://localhost:3008/users?${sorteRow}`);
    const data = await response.json();

    await dispatch(setUsersAction(data));
    await dispatch(usersLoaderAction(false));
  };
};
export const deLeteUserAction = (id:number) => {
  return async (dispatch: AppDispatch) => {
    await dispatch(usersLoaderAction(true));
    await fetch('http://localhost:3008/users/' + id, {
      method: 'DELETE',
    })
    await dispatch(getUsersAction());
  };
};

export const usersLoaderAction = (data: boolean) => ({
  type: EUsersActionTypes.LOADING,
  payload: data,
});
export const setAgeAction = (data: EAgeFilter) => ({
  type: EUsersActionTypes.CHANGE_AGE,
  payload: data,
});
export const setColorAction = (data: EColorFilter) => ({
  type: EUsersActionTypes.CHANGE_COLOR,
  payload: data,
});
export const setGenderAction = (data: EGenderFilter) => ({
  type: EUsersActionTypes.CHANGE_GENDER,
  payload: data,
});
export const setUsersAction = (data: TUSer[]) => ({
  type: EUsersActionTypes.SET_USERS,
  payload: data,
});


