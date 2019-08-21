import ActionConstants from '../constants';

const initialState = {
  isAuthenticated: false,
  data: {},
};

export const user = (state = initialState, action) => {
  switch (action.type) {
    case ActionConstants.REGISTER_USER: {
      return {
        ...state,
        data: action.payload,
      };
    }

    default: { return state; }
  }
};

export default user;
