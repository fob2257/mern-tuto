import axios from 'axios';

import ActionConstants from '../constants';
import { setAuthToken, removeAuthToken, decodeAuthToken } from '../utils';

export const logInUserType = payload => ({ type: ActionConstants.LOGIN_USER, payload });

export const logOutUserType = { type: ActionConstants.LOGOUT_USER };

export const errorType = payload => ({ type: ActionConstants.GET_ERROR, payload });

/**
 * Action Creators
 */

export const registerUserAction = (userData, history) => async (dispatch) => {
  try {
    const res = await axios.post('/api/users/register/', { ...userData });
    history.push('/login');
  } catch (error) {
    const { response: { data } } = error;
    dispatch(errorType(data));
  }
};

export const logInUserAction = (userData) => async (dispatch) => {
  try {
    const res = await axios.post('/api/users/login/', { ...userData });
    const { token } = res.data;

    const data = await decodeAuthToken(token);

    setAuthToken(token);
    dispatch(logInUserType(data));
  } catch (error) {
    const { response: { data } } = error;
    dispatch(errorType(data));
  }
};

export const logOutUserAction = () => (dispatch) => {
  removeAuthToken();
  dispatch(logOutUserType);

  window.location.href = '/';
};
