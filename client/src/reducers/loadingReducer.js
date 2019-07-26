const def = {};

const loadingReducer = (state = def, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return {
        loading: true
      };
    default:
      return {
        loading: false
      };
  }
};

export default loadingReducer;
