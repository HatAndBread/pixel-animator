const canvasHeightReducer = (state = 32, action) => {
  switch (action.type) {
    case 'INCREASE':
      return state + action.payload;
    case 'DECREASE':
      return state - action.payload;
    default:
      return state;
  }
};

export default canvasHeightReducer;
