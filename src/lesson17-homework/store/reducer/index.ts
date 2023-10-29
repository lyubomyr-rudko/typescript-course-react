import { combineReducers } from 'redux';
import { States } from '../constants';
import usersReducer from './usersReducer';


export default combineReducers({
  [States.UESRS]: usersReducer
});
