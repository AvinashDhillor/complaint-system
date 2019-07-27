import { CREATE_C_USER, LOGIN, GET_PROFILE } from './types';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';

export const clientLogin = data => dispatch => {
  dispatch(setLoading(true));
  axios
    .post('/client/users/login', data)
    .then(res => {
      const { token, user } = res.data;
      localStorage.setItem('jwtToken', token);
      setAuthToken(token);
      dispatch({
        type: LOGIN,
        payload: user
      });
      dispatch(setLoading());
    })
    .catch(err => {
      console.log(err);
    });
};

export const getProfile = cb => {
  axios
    .get('/client/users/me')
    .then(res => {
      cb({
        type: GET_PROFILE,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
    });
};

export const userRegister = data => dispatch => {
  dispatch(setLoading(true));
  axios
    .post('/client/users/signup', data)
    .then(res => {
      if (res.data) {
        console.log(res.data);
      }
    })
    .catch(err => {
      dispatch(setLoading());
      console.log(err);
    });
  dispatch(setLoading());
};

export const clientLogout = () => dispatch => {};

export const setLoading = (isLoading = false) => {
  if (isLoading) {
    return {
      type: 'SET_LOADING'
    };
  } else {
    return {
      type: 'UNSET_LOADING'
    };
  }
};
