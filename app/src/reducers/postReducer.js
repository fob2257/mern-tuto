import ActionConstants from '../constants';

const initialState = {
  post: null,
  posts: null,
  loading: false,
};

export const post = (state = initialState, action) => {
  switch (action.type) {
    case ActionConstants.SET_LOADING_POST: {
      return {
        ...state,
        loading: !state.loading,
      };
    }

    case ActionConstants.SET_POST: {
      return {
        ...state,
        post: action.payload,
      };
    }

    case ActionConstants.SET_POSTS: {
      return {
        ...state,
        posts: action.payload,
      };
    }

    case ActionConstants.REMOVE_POST: {
      return {
        ...state,
        posts: (!state.posts) ? state.posts : state.posts.filter(p => p._id !== action.payload),
      };
    }

    default: { return state; }
  }
};

export default post;
