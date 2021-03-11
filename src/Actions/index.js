export const openSettings = () => {
  return {
    type: 'OPEN'
  };
};

export const closeSettings = () => {
  return {
    type: 'CLOSE'
  };
};

export const increaseCanvasSize = (amount) => {
  return {
    type: 'INCREASE',
    payload: amount
  };
};

export const decreaseCanvasSize = (amount) => {
  return {
    type: 'DECREASE',
    payload: amount
  };
};

export const createNewProject = (defaults) => {
  return {
    type: 'NEW',
    payload: defaults
  };
};
