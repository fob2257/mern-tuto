import axios from 'axios';

import ActionConstants from '../constants';

export const registerUser = (userData, history) => (dispatch) => {
  // type: ActionConstants.REGISTER_USER,
  //   payload: data,
  axios.post('/api/users/register/', { ...userData })
    .then(res => history.push('/login'))
    .catch((error) => {
      const { response: { data } } = error;

      dispatch({
        type: ActionConstants.GET_ERROR,
        payload: { ...data },
      });
    });
};
