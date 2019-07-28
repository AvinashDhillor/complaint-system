import { LOAD_ADMIN_USER } from '../actions/types';
const ad = [];

export default (state = ad, action) => {
  switch (action.type) {
    case LOAD_ADMIN_USER:
      return action.payload;
    default:
      return state;
  }
};
