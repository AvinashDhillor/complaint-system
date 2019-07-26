import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import ClientRouter from './routers/client/AppRouter';
import store from './store/configureStore';
import setAuthToken from './utils/setAuthToken';
import { getProfile } from './actions/clientUserActions';

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  let data = JSON.parse(localStorage.getItem('user'));
  // console.log({ type: 'GET_PROFILE', payload: data });
  // store().dispatch({ type: 'GET_PROFILE', payload: data });

  getProfile(cb => {
    store().dispatch(cb);
  });
}

function App() {
  return (
    <>
      <Provider store={store()}>
        <ClientRouter />
      </Provider>
    </>
  );
}

export default App;
