import { LOAD_REJECTED } from '../actions/types';

const def = [];

export default (state = def, action) => {
  switch (action.type) {
    case LOAD_REJECTED:
      return action.payload;
    default:
      return state;
  }
};
