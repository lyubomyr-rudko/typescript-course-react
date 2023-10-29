export enum EUsersActionTypes {
    LOADING = 'USERS/USER_LOADING',
    CHANGE_AGE = 'USERS/CHANGE_AGE',
    CHANGE_GENDER = 'USERS/CHANGE_GENDER',
    CHANGE_COLOR = 'USERS/CHANGE_COLOR',
    SET_USERS = 'USERS/SET_USERS'

  }

  export enum EGenderFilter {
    MALE = 'male',
    FEMALE = 'female',
    ALL = 'all',
  }
  export enum EColorFilter {
    GREEN = 'Green',
    BROWN = 'Brown',
    GRAY = 'Gray',
    BLUE = 'Blue',
    AMBER = 'Amber',
    ALL = 'all'
  }
  export enum EAgeFilter {
    LESS20 = 'less 20',
    '20TO40' = '20 to 40',
    MORE40 = 'more 40',
    ALL = 'all',
  }
  export enum EAgeFilterQuery {
    'less 20' = 'age_lte=20',
    '20 to 40' = 'age_lte=20&age_gte=40',
    'more 40' = 'age_gte=40',
    'all' = 'all',
  }

  
  export type TUSer = {
    firstName: string;
    lastName: string;
    id: number;
  }

 export type TUserState = {
    genderFilter: EGenderFilter;
    colorFilter: EColorFilter;
    ageFilter: EAgeFilter;
    users: TUSer[];
    loading:boolean;
  };