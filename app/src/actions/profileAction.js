import axios from 'axios';

import ActionConstants from '../constants';

/**
 * Action Creators
 */

const setProfileLoading = () => ({ type: ActionConstants.LOADING_PROFILE });

export const getCurrentProfile = () => async (dispatch) => {
  dispatch(setProfileLoading());
  try {
    const res = await axios.get('/api/profiles/', {
      params: {
        only: true
      }
    });

    const [payload] = res.data;

    if (payload) {
      dispatch({
        type: ActionConstants.GET_PROFILE,
        payload,
      });
    }
  } catch (error) {
    const { response: { data } } = error;

    dispatch({
      type: ActionConstants.GET_ERROR,
      payload: data,
    });
  }
  dispatch(setProfileLoading());
};

export const clearCurrentProfile = () => dispatch =>
  dispatch({
    type: ActionConstants.GET_PROFILE,
    payload: null,
  });
