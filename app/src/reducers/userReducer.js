import ActionConstants from '../constants';

const initialState = {
  isAuthenticated: false,
  data: {},
};

export const user = (state = initialState, action) => {
  switch (action.type) {
    case ActionConstants.LOGIN_USER: {
      return {
        ...state,
        isAuthenticated: Object.keys(action.payload).length > 0,
        data: action.payload,
      };
    }

    case ActionConstants.LOGOUT_USER: {
      return {
        ...state,
        isAuthenticated: false,
        data: {},
      };
    }

    default: { return state; }
  }
};

export default user;
