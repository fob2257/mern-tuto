import ActionConstants from '../constants';

const initialState = {};

export const error = (state = initialState, action) => {
  switch (action.type) {
    case ActionConstants.SET_ERROR: {
      return action.payload;
    }

    default: { return state; }
  }
};

export default error;
