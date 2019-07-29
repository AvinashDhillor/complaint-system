import { SET_MESSAGE, CLEAR_MESSAGE } from '../actions/types';
import isEmpty from '../validation/isEmpty';

const def = {
  isEmpty: true,
  text: ''
};

export default (state = def, action) => {
  switch (action.type) {
    case SET_MESSAGE:
      return { isEmpty: isEmpty(action.payload), text: action.payload };
    case CLEAR_MESSAGE:
      return {
        isEmpty: true,
        text: ''
      };
    default:
      return state;
  }
};
