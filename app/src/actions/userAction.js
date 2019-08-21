import axios from 'axios';
import jwtDecode from 'jwt-decode';

import ActionConstants from '../constants';
import { setAuthToken, removeAuthToken } from '../utils';

export const registerUser = (userData, history) => dispatch =>
  axios.post('/api/users/register/', { ...userData })
    .then(res => history.push('/login'))
    .catch((error) => {
      const { response: { data } } = error;

      dispatch({
        type: ActionConstants.GET_ERROR,
        payload: { ...data },
      });
    });

export const logInUser = userData => dispatch =>
  axios.post('/api/users/login/', { ...userData })
    .then((res) => {
      const { token } = res.data;

      localStorage.setItem('token', token);

      setAuthToken(token);

      const decodedToken = jwtDecode(token);

      dispatch({
        type: ActionConstants.LOGIN_USER,
        payload: { ...decodedToken },
      });
    })
    .catch((error) => {
      const { response: { data } } = error;

      dispatch({
        type: ActionConstants.GET_ERROR,
        payload: { ...data },
      });
    });

export const logOutUser = () => (dispatch) => {
  localStorage.removeItem('token');
  removeAuthToken();
  dispatch({ type: ActionConstants.LOGOUT_USER });
};
