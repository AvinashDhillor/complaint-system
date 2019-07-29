import {
  CREATE_C_USER,
  CREATE_COMPLAINT,
  LOGOUT,
  LOGIN,
  GET_PROFILE,
  LOAD_PENDING,
  LOAD_REJECTED,
  LOAD_RESOLVED
} from './types';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';

export const loadPending = () => dispatch => {
  dispatch(setLoading(true));
  axios
    .get('/complaint/pending')
    .then(res => {
      dispatch({
        type: LOAD_PENDING,
        payload: res.data
      });
      dispatch(setLoading());
    })
    .catch(err => {
      dispatch(setLoading());
      console.log(err);
    });
};

export const loadResolved = () => dispatch => {
  dispatch(setLoading(true));
  axios
    .get('/complaint/resolved')
    .then(res => {
      dispatch({
        type: LOAD_RESOLVED,
        payload: res.data
      });
      dispatch(setLoading());
    })
    .catch(err => {
      dispatch(setLoading());
      console.log(err);
    });
};

export const loadRejected = () => dispatch => {
  dispatch(setLoading(true));
  axios
    .get('/complaint/rejected')
    .then(res => {
      dispatch({
        type: LOAD_REJECTED,
        payload: res.data
      });
      dispatch(setLoading());
    })
    .catch(err => {
      dispatch(setLoading());
      console.log(err);
    });
};

export const clientLogin = data => dispatch => {
  dispatch(setLoading(true));
  axios
    .post('/c/users/login', data)
    .then(res => {
      const { token, user } = res.data;
      localStorage.setItem('jwtToken', token);
      localStorage.setItem('user', JSON.stringify(user));
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

export const createComplaint = data => dispatch => {
  axios
    .post('/complaint/create', data)
    .then(res => {
      dispatch(loadPending());
    })
    .catch(err => {
      console.log(err);
    });
};

export const getProfile = cb => {
  axios
    .get('/c/users/me')
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
    .post('/c/users/signup', data)
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

export const clientLogout = () => dispatch => {
  localStorage.removeItem('jwtToken');
  let data = {
    isAuth: false,
    user: { role: '' }
  };
  dispatch({
    type: LOGOUT,
    payload: data
  });
  axios
    .delete('/c/users/me/token')
    .then(() => {})
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
