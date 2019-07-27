import { createStore, combineReducers, compose, applyMiddleware } from 'redux';

import thunk from 'redux-thunk';

import loadingReducer from '../reducers/loadingReducer';
import clientUserReducer from '../reducers/clientUserReducer';
import departmentReducer from '../reducers/departmentReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      loadingStatus: loadingReducer,
      client: clientUserReducer,
      departments: departmentReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
  );

  return store;
};
