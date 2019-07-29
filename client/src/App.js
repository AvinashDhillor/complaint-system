import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import ClientRouter from './routers/client/AppRouter';
import configureStore from './store/configureStore';
import setAuthToken from './utils/setAuthToken';
import { getProfile } from './actions/clientUserActions';
import { LOGIN } from './actions/types';
const store = configureStore();

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  let user = JSON.parse(localStorage.user);
  store.dispatch({ type: LOGIN, payload: user });
  getProfile(cb => {
    store.dispatch(cb);
  });
}

function App() {
  return (
    <>
      <Provider store={store}>
        <ClientRouter />
      </Provider>
    </>
  );
}

export default App;
