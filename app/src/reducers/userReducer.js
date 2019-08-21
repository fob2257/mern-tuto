import ActionConstants from '../constants';

const initialState = {
  isAuthenticated: false,
  data: {},
};

export const user = (state = initialState, action) => {
  switch (action.type) {
    // case ActionConstants.REGISTER_USER: {
    //   return { data: action.payload };
    // }

    case ActionConstants.LOGIN_USER: {
      return {
        isAuthenticated: !(Object.keys(action.payload).length > 0),
        data: action.payload,
      };
    }

    case ActionConstants.LOGOUT_USER: {
      return {
        isAuthenticated: false,
        data: {},
      };
    }

    default: { return state; }
  }
};

export default user;
