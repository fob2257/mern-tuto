import axios from 'axios';

import ActionConstants from '../constants';
import { setAuthToken, removeAuthToken, decodeAuthToken } from '../utils';

import { clearCurrentProfile } from './profileAction';

const logInUserType = payload => ({ type: ActionConstants.LOGIN_USER, payload });

const logOutUserType = { type: ActionConstants.LOGOUT_USER };

const errorType = payload => ({ type: ActionConstants.GET_ERROR, payload });

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

export const logInUserAction = (userData = null, jwt = null) => async (dispatch) => {
  try {
    let token = jwt;

    if (!token && userData) {
      const res = await axios.post('/api/users/login/', { ...userData });

      token = res.data.token;
    }

    const data = await decodeAuthToken(token);

    if (data) {
      const { decodedToken, expirationTime } = data;

      setAuthToken(token);
      dispatch(logInUserType(decodedToken));
    }
  } catch (error) {
    const { response: { data } } = error;
    dispatch(errorType(data));
  }
};

export const logOutUserAction = () => (dispatch) => {
  removeAuthToken();
  dispatch(logOutUserType);

  clearCurrentProfile()(dispatch);

  window.location.href = '/';
};
