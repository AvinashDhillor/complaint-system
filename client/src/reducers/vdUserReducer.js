import { LOAD_VERIFIED_DUSER } from '../actions/types';

const vd = [];

export default (state = vd, action) => {
  switch (action.type) {
    case LOAD_VERIFIED_DUSER:
      return action.payload;
    default:
      return state;
  }
};
