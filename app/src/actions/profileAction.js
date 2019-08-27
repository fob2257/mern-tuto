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

export const createProfile = (profileData, history) => async (dispatch) => {
  try {
    const res = await axios.post('/api/profiles', { ...profileData });

    history.push('/dashboard');
  } catch (error) {
    const { response: { data } } = error;

    dispatch({
      type: ActionConstants.GET_ERROR,
      payload: data,
    });
  }
};

export const updateCurrentProfile = (profileData, history) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/profiles/${profileData.id}`, { ...profileData });

    // const payload = res.data;

    // if (payload) {
    //   dispatch({
    //     type: ActionConstants.GET_PROFILE,
    //     payload,
    //   });
    // }

    history.push('/dashboard');
  } catch (error) {
    const { response: { data } } = error;

    dispatch({
      type: ActionConstants.GET_ERROR,
      payload: data,
    });
  }
};

export const addExperience = (experienceData, history) => async (dispatch) => {
  try {
    const res = await axios.post('/api/profiles/experience/', { ...experienceData });

    history.push('/dashboard');
  } catch (error) {
    const { response: { data } } = error;

    dispatch({
      type: ActionConstants.GET_ERROR,
      payload: data,
    });
  }
};

export const addEducation = (educationData, history) => async (dispatch) => {
  try {
    const res = await axios.post('/api/profiles/education/', { ...educationData });

    history.push('/dashboard');
  } catch (error) {
    const { response: { data } } = error;

    dispatch({
      type: ActionConstants.GET_ERROR,
      payload: data,
    });
  }
};

export const deleteExperience = id => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/profiles/experience/${id}/`);

    const { data: payload } = res;

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
};

export const deleteEducation = id => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/profiles/education/${id}/`);

    const { data: payload } = res;

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
};

export const getProfiles = () => async (dispatch) => {
  dispatch(setProfileLoading());
  try {
    const res = await axios.get('/api/profiles/');

    const { data: payload } = res;

    if (payload) {
      dispatch({
        type: ActionConstants.GET_PROFILES,
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

export const clearProfiles = () => dispatch =>
  dispatch({
    type: ActionConstants.GET_PROFILES,
    payload: null,
  });
