import { LOAD_VERIFIED_CUSER } from '../actions/types';

const vc = [];

export default (state = vc, action) => {
  switch (action.type) {
    case LOAD_VERIFIED_CUSER:
      return action.payload;
    default:
      return state;
  }
};
