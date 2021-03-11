const canvasWidthReducer = (state = 32, action) => {
  switch (action.type) {
    case 'INCREASE':
      return state + 1;
    case 'DECREASE':
      return state + 2;
    default:
      return state;
  }
};

export default canvasWidthReducer;
