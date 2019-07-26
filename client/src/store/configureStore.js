import { createStore, combineReducers, compose, applyMiddleware } from 'redux';

import thunk from 'redux-thunk';

import loadingReducer from '../reducers/loadingReducer';
import clientUserReducer from '../reducers/clientUserReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      loadingStatus: loadingReducer,
      client: clientUserReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
  );

  return store;
};
