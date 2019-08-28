import axios from 'axios';

import ActionConstants from '../constants';

const loadingProfileType = { type: ActionConstants.SET_LOADING_PROFILE };

const profileType = payload => ({ type: ActionConstants.SET_PROFILE, payload });

const profilesType = payload => ({ type: ActionConstants.SET_PROFILES, payload });

const errorType = payload => ({ type: ActionConstants.SET_ERROR, payload });

/**
 * Action Creators
 */

export const getCurrentProfile = () => async (dispatch) => {
  dispatch(loadingProfileType);
  try {
    const res = await axios.get('/api/profiles/', {
      params: {
        only: true
      }
    });

    const [payload] = res.data;

    if (payload) {
      dispatch(profileType(payload));
    }
  } catch (error) {
    const { response: { data } } = error;

    dispatch(errorType(data));
  }
  dispatch(loadingProfileType);
};

export const clearCurrentProfile = () => dispatch =>
  dispatch(profileType(null));

export const createProfile = (profileData, history) => async (dispatch) => {
  try {
    const res = await axios.post('/api/profiles', { ...profileData });

    history.push('/dashboard');
  } catch (error) {
    const { response: { data } } = error;

    dispatch(errorType(data));
  }
};

export const updateCurrentProfile = (profileData, history) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/profiles/${profileData.id}`, { ...profileData });

    // const payload = res.data;

    // if (payload) {
    //   dispatch(profileType(payload));
    // }

    history.push('/dashboard');
  } catch (error) {
    const { response: { data } } = error;

    dispatch(errorType(data));
  }
};

export const addExperience = (experienceData, history) => async (dispatch) => {
  try {
    const res = await axios.post('/api/profiles/experience/', { ...experienceData });

    history.push('/dashboard');
  } catch (error) {
    const { response: { data } } = error;

    dispatch(errorType(data));
  }
};

export const addEducation = (educationData, history) => async (dispatch) => {
  try {
    const res = await axios.post('/api/profiles/education/', { ...educationData });

    history.push('/dashboard');
  } catch (error) {
    const { response: { data } } = error;

    dispatch(errorType(data));
  }
};

export const deleteExperience = id => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/profiles/experience/${id}/`);

    const { data: payload } = res;

    if (payload) {
      dispatch(profileType(payload));
    }
  } catch (error) {
    const { response: { data } } = error;

    dispatch(errorType(data));
  }
};

export const deleteEducation = id => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/profiles/education/${id}/`);

    const { data: payload } = res;

    if (payload) {
      dispatch(profileType(payload));
    }
  } catch (error) {
    const { response: { data } } = error;

    dispatch(errorType(data));
  }
};

export const getProfiles = () => async (dispatch) => {
  dispatch(loadingProfileType);
  try {
    const res = await axios.get('/api/profiles/');

    const { data: payload } = res;

    if (payload) {
      dispatch(profilesType(payload));
    }
  } catch (error) {
    const { response: { data } } = error;

    dispatch(errorType(data));
  }
  dispatch(loadingProfileType);
};

export const clearProfiles = () => dispatch =>
  dispatch(profilesType(null));

export const getProfileByHandle = handle => async (dispatch) => {
  dispatch(loadingProfileType);
  try {
    const res = await axios.get(`/api/profiles/handle/${handle}/`);

    const { data: payload } = res;

    if (payload) {
      dispatch(profileType(payload));
    }
  } catch (error) {
    const { response: { data } } = error;

    dispatch(errorType(data));
  }
  dispatch(loadingProfileType);
};
