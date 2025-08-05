import { combineReducers } from 'redux';
import userReducer from './user';
import walletReducer from './wallet';

const rootReducers = combineReducers({
  user: userReducer,
  wallet: walletReducer,
});

export default rootReducers;
