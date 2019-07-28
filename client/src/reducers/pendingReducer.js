import { LOAD_PENDING, LOAD_ADMIN_COMPLAINTS } from '../actions/types';

const def = [];

export default (state = def, action) => {
  switch (action.type) {
    case LOAD_PENDING:
      return action.payload;
    case LOAD_ADMIN_COMPLAINTS:
      return action.payload;
    default:
      return state;
  }
};
