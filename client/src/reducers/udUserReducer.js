import { LOAD_UNVERIFIED_DUSER } from '../actions/types';

const ud = [];

export default (state = ud, action) => {
  switch (action.type) {
    case LOAD_UNVERIFIED_DUSER:
      return action.payload;
    default:
      return state;
  }
};
