import { combineReducers } from 'redux';
import userReducer from './user';
import wallet from './wallet';

const rootReducers = combineReducers({
  user: userReducer,
  wallet,
});

export default rootReducers;
