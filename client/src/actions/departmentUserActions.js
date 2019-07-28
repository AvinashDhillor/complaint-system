import {
  GET_DEPARTMENTS,
  CREATE_D_USER,
  LOAD_RESOLVED,
  LOAD_ALL_RESOLVED
} from './types';
import axios from 'axios';

export const getDepartments = () => dispatch => {
  axios
    .get('/department')
    .then(res => {
      dispatch({
        type: GET_DEPARTMENTS,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
    });
};

export const duserRegister = data => dispatch => {
  dispatch(setLoading(true));
  axios
    .post('/d/users/signup', data)
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

export const dloadResolved = () => dispatch => {
  axios
    .get('/d/resolved')
    .then(res => {
      dispatch({
        type: LOAD_RESOLVED,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
    });
};
export const dallloadResolved = () => dispatch => {
  axios
    .get('/d/resolved/all')
    .then(res => {
      dispatch({
        type: LOAD_ALL_RESOLVED,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
    });
};

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

export const resolveComplaint = data => dispatch => {
  axios
    .post('/d/resolve', data)
    .then(res => {
      console.log(res.data);
    })
    .catch(err => console.log(err));
};
