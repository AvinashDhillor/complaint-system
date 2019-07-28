import { createStore, combineReducers, compose, applyMiddleware } from 'redux';

import thunk from 'redux-thunk';

import loadingReducer from '../reducers/loadingReducer';
import clientUserReducer from '../reducers/clientUserReducer';
import departmentReducer from '../reducers/departmentReducer';
import pendingReducer from '../reducers/pendingReducer';
import resolvedReducer from '../reducers/resolvedReducer';
import rejectedReducer from '../reducers/rejectedReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      loadingStatus: loadingReducer,
      client: clientUserReducer,
      departments: departmentReducer,
      pending: pendingReducer,
      resolved: resolvedReducer,
      rejected: rejectedReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
  );

  return store;
};
