import {
  CREATE_C_USER,
  CREATE_COMPLAINT,
  LOGOUT,
  LOGIN,
  GET_PROFILE,
  LOAD_PENDING,
  LOAD_REJECTED,
  LOAD_RESOLVED,
  SET_MESSAGE,
  CLEAR_MESSAGE
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
      let { msg } = err.response.data;
      dispatch(setMessage(msg));
      dispatch(setLoading());
      console.log(err);
    });
};

export const createComplaint = (data, history) => dispatch => {
  axios
    .post('/complaint/create', data)
    .then(res => {
      let { msg } = res.data;
      dispatch(setMessage(msg));
      dispatch(loadPending());
      setTimeout(() => {
        history.push('/c/panel/complaint/pending');
      }, 2000);
    })
    .catch(err => {
      let { msg } = err.response.data;
      dispatch(setMessage(msg));
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

export const userRegister = (data, history) => dispatch => {
  dispatch(setLoading(true));
  axios
    .post('/c/users/signup', data)
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
