import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import userReducer from '../reducers/userReducer';
import errorReducer from '../reducers/errorReducer';

const logger = store => next => action => {
  let result;

  console.log('dispatching', action.type);
  console.log('prev state', store.getState());
  console.log('action', action);

  result = next(action);

  console.log('next state', store.getState());
  console.groupEnd();

  return result;
};

const middleware = [
  logger,
  thunk,
];

export const storeFactory = (initialState = {}) =>
  compose(applyMiddleware(...middleware), window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f)(createStore)(
    combineReducers({ userReducer, errorReducer }),
    initialState
  );

// const store = createStore(
//   combineReducers({ auth }),
//   initialState,
//   compose(applyMiddleware(...middleware), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
// );


