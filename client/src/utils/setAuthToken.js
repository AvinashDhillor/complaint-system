import axios from 'axios';

const setAuthToken = token => {
  if (token) {
    axios.defaults.headers.common['cu-auth'] = token;
  } else {
    delete axios.defaults.headers.common['cu-auth'];
  }
};

export default setAuthToken;
