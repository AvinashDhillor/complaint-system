import { createStore, combineReducers, compose, applyMiddleware } from 'redux';

import thunk from 'redux-thunk';

import loadingReducer from '../reducers/loadingReducer';
import clientUserReducer from '../reducers/clientUserReducer';
import departmentReducer from '../reducers/departmentReducer';
import pendingReducer from '../reducers/pendingReducer';
import resolvedReducer from '../reducers/resolvedReducer';
import rejectedReducer from '../reducers/rejectedReducer';
import allResolvedReducer from '../reducers/allResolvedReducer';
import ud from '../reducers/udUserReducer';
import uc from '../reducers/ucUserReducer';
import vd from '../reducers/vdUserReducer';
import vc from '../reducers/vcUserReducer';
import ad from '../reducers/adminUserReducer';
import msgReducer from '../reducers/msgReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      loadingStatus: loadingReducer,
      client: clientUserReducer,
      departments: departmentReducer,
      pending: pendingReducer,
      resolved: resolvedReducer,
      rejected: rejectedReducer,
      allresolved: allResolvedReducer,
      uc: uc,
      vd: vd,
      vc: vc,
      ud: ud,
      ad: ad,
      msg: msgReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
  );

  return store;
};
