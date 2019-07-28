import { LOAD_UNVERIFIED_CUSER } from '../actions/types';
const uc = [];

export default (state = uc, action) => {
  switch (action.type) {
    case LOAD_UNVERIFIED_CUSER:
      return action.payload;
    default:
      return state;
  }
};
