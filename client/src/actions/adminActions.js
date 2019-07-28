import axios from 'axios';
import {
  LOAD_UNVERIFIED_CUSER,
  LOAD_VERIFIED_CUSER,
  LOAD_UNVERIFIED_DUSER,
  LOAD_VERIFIED_DUSER,
  LOAD_ADMIN_USER,
  LOAD_ADMIN_COMPLAINTS
} from './types';
import { log } from 'util';

export const addDepartment = data => dispatch => {
  axios
    .post('/department/new', data)
    .then(res => {
      console.log(res.data);
    })
    .catch(err => {
      console.log(err);
    });
};

export const registerAdmin = data => dispatch => {
  axios
    .post('/admin/signup', data)
    .then(res => {
      console.log(res.data);
    })
    .catch(err => {
      console.log(err);
    });
};

export const udUser = () => dispatch => {
  axios
    .get('/admin/u/d/users')
    .then(res => {
      dispatch({
        type: LOAD_UNVERIFIED_DUSER,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
    });
};
export const vdUser = () => dispatch => {
  axios
    .get('/admin/v/d/users')
    .then(res => {
      dispatch({
        type: LOAD_VERIFIED_DUSER,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
    });
};
export const ucUser = () => dispatch => {
  axios
    .get('/admin/u/c/users')
    .then(res => {
      dispatch({
        type: LOAD_UNVERIFIED_CUSER,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
    });
};

export const vcUser = () => dispatch => {
  axios
    .get('/admin/v/c/users')
    .then(res => {
      dispatch({
        type: LOAD_VERIFIED_CUSER,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
    });
};

export const loadadmin = () => dispatch => {
  axios
    .get('/admin/a/users')
    .then(res => {
      dispatch({
        type: LOAD_ADMIN_USER,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
    });
};

export const loadComplaints = () => dispatch => {
  axios
    .get('/admin/j/complaints')
    .then(res => {
      dispatch({
        type: LOAD_ADMIN_COMPLAINTS,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
    });
};

export const deleteDepartment = data => dispatch => {
  axios
    .post('/admin/delete/department', data)
    .then(res => {
      console.log(res.data);
    })
    .catch(err => {
      console.log(err);
    });
};

export const approveComplaint = data => dispatch => {
  axios
    .post('/admin/j/complaints/approve', data)
    .then(res => {
      console.log(res.data);
    })
    .catch(err => console.log(err));
};

export const rejectComplaint = data => dispatch => {
  axios
    .post('/admin/j/complaints/reject', data)
    .then(res => {
      console.log(res.data);
    })
    .catch(err => console.log(err));
};

export const verifyUser = data => dispatch => {
  axios
    .post('/admin/verify/user', data)
    .then(res => {
      console.log(res.data);
    })
    .catch(err => {
      console.log(err);
    });
};
export const deleteUser = data => dispatch => {
  axios
    .post('/admin/delete/user', data)
    .then(res => {
      console.log(res.data);
    })
    .catch(err => {
      console.log(err);
    });
};
