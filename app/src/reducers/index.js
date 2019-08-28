import { combineReducers } from 'redux';

import errorReducer from './errorReducer';
import userReducer from './userReducer';
import profileReducer from './profileReducer';
import postReducer from './postReducer';

export default combineReducers({
  errorReducer,
  userReducer,
  profileReducer,
  postReducer,
});
