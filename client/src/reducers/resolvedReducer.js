import { LOAD_RESOLVED } from '../actions/types';

const def = [];

export default (state = def, action) => {
  switch (action.type) {
    case LOAD_RESOLVED:
      return action.payload;
    default:
      return state;
  }
};
