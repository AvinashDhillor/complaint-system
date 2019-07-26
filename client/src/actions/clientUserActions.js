import { CREATE_C_USER, LOGIN, GET_PROFILE } from './types';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';

export const clientLogin = data => dispatch => {
  axios
    .post('/client/users/login', data)
    .then(res => {
      const { token, user } = res.data;
      localStorage.setItem('jwtToken', token);
      setAuthToken(token);
      return dispatch({
        type: LOGIN,
        payload: user
      });
    })
    .catch(err => {
      console.log(err);
    });
};

export const getProfile = cb => {
  axios
    .get('/client/users/me')
    .then(res => {
      let dat = {
        type: GET_PROFILE,
        payload: res.data
      };
      cb(dat);
    })
    .catch(err => {
      console.log(err);
    });
};

export const dUserRegister = data => dispatch => {};

export const cUserRegister = data => dispatch => {};

export const clientLogout = () => dispatch => {};

export const setLoading = (isLoading = false) => dispatch => {
  if (isLoading) {
    return dispatch({
      type: 'SET_LOADING'
    });
  } else {
    return dispatch({
      type: 'UNSET_LOADING'
    });
  }
};
