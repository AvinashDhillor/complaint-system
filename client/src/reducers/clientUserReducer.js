import { GET_PROFILE, LOGOUT, LOGIN } from '../actions/types';
import isEmpty from '../validation/isEmpty';

const st = {
  isAuth: false,
  user: { role: '' }
};

export default (state = st, action) => {
  switch (action.type) {
    case LOGIN:
      return { isAuth: !isEmpty(action.payload), user: action.payload };
    case GET_PROFILE:
      return { isAuth: !isEmpty(action.payload), user: action.payload };
    case LOGOUT:
      return action.payload;
    default:
      return state;
  }
};
