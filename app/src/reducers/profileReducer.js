import ActionConstants from '../constants';

const initialState = {
  profile: null,
  profiles: null,
  loading: false,
};

export const profile = (state = initialState, action) => {
  switch (action.type) {
    case ActionConstants.SET_LOADING_PROFILE: {
      return {
        ...state,
        loading: !state.loading,
      };
    }

    case ActionConstants.SET_PROFILE: {
      return {
        ...state,
        profile: action.payload,
      };
    }

    case ActionConstants.SET_PROFILES: {
      return {
        ...state,
        profiles: action.payload,
      };
    }

    default: { return state; }
  }
};

export default profile;
