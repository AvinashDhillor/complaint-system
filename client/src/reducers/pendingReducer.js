import { LOAD_PENDING } from '../actions/types';

const def = [];

export default (state = def, action) => {
  switch (action.type) {
    case LOAD_PENDING:
      return action.payload;
    default:
      return state;
  }
};
