import {
  GET_DEPARTMENTS,
  CREATE_D_USER,
  LOAD_RESOLVED,
  LOAD_ALL_RESOLVED,
  SET_MESSAGE,
  CLEAR_MESSAGE
} from './types';
import axios from 'axios';
import { loadPending } from './clientUserActions';

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

export const duserRegister = (data, history) => dispatch => {
  dispatch(setLoading(true));
  axios
    .post('/d/users/signup', data)
    .then(res => {
      let { msg } = res.data;
      dispatch(setMessage(msg));
      dispatch(setLoading());
      setTimeout(() => {
        history.push('/');
      }, 3000);
    })
    .catch(err => {
      let { msg } = err.response.data;
      dispatch(setMessage(msg));
      dispatch(setLoading());
      console.log(err);
    });
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
      let { msg } = res.data;
      dispatch(setMessage(msg));
      dispatch(loadPending());
    })
    .catch(err => {
      let { msg } = err.response.data;
      dispatch(setMessage(msg));
      console.log(err);
    });
};

export const setMessage = (text = '') => {
  if (text !== '') {
    return {
      type: SET_MESSAGE,
      payload: text
    };
  } else {
    return {
      type: CLEAR_MESSAGE
    };
  }
};

export const clearMessage = () => dispatch => {
  dispatch({
    type: CLEAR_MESSAGE
  });
};
