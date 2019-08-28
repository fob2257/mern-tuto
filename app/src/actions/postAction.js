import axios from 'axios';

import ActionConstants from '../constants';

const loadingPostType = { type: ActionConstants.SET_LOADING_POST };

const postType = payload => ({ type: ActionConstants.SET_POST, payload });

const postsType = payload => ({ type: ActionConstants.SET_POSTS, payload });

const removePostType = payload => ({ type: ActionConstants.REMOVE_POST, payload });

const errorType = payload => ({ type: ActionConstants.SET_ERROR, payload });

/**
 * Action Creators
 */

export const getPosts = () => async (dispatch) => {
  dispatch(loadingPostType);
  try {
    const { data: payload } = await axios.get('/api/posts/');

    if (payload) {
      dispatch(postsType(payload));
    }
  } catch (error) {
    const { response: { data } } = error;

    dispatch(errorType(data));
  }
  dispatch(loadingPostType);
};

export const clearPosts = () => dispatch => dispatch(postsType(null));

export const createPost = postData => async (dispatch) => {
  try {
    const res = await axios.post('/api/posts/', { ...postData });

    dispatch(getPosts());
  } catch (error) {
    const { response: { data } } = error;

    dispatch(errorType(data));
  }
};

export const likePost = id => async (dispatch) => {
  try {
    const res = await axios.post(`/api/posts/${id}/like/`);

    dispatch(getPosts());
  } catch (error) {
    const { response: { data } } = error;

    dispatch(errorType(data));
  }
};

export const commentPost = ({ id, text }) => async (dispatch) => {
  try {
    const res = await axios.post(`/api/posts/${id}/comment/`, { text });

    dispatch(getPosts());
  } catch (error) {
    const { response: { data } } = error;

    dispatch(errorType(data));
  }
};

export const deleteCommentPost = ({ postId, commentId }) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/posts/${postId}/comment/${commentId}/`);

    dispatch(getPosts());
  } catch (error) {
    const { response: { data } } = error;

    dispatch(errorType(data));
  }
};

export const getPost = id => async (dispatch) => {
  dispatch(loadingPostType);
  try {
    const { data: payload } = await axios.get(`/api/posts/${id}/`);

    if (payload) {
      dispatch(postType(payload));
    }
  } catch (error) {
    const { response: { data } } = error;

    dispatch(errorType(data));
  }
  dispatch(loadingPostType);
};

export const clearPost = () => dispatch => dispatch(postType(null));

export const deletePost = id => async (dispatch) => {
  dispatch(loadingPostType);
  try {
    await axios.delete(`/api/posts/${id}/`);

    dispatch(removePostType(id));
  } catch (error) {
    const { response: { data } } = error;

    dispatch(errorType(data));
  }
  dispatch(loadingPostType);
};
