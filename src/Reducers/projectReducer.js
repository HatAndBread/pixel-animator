import Project from '../Models/Project';

const projectReducer = (state = new Project(), action) => {
  switch (action.type) {
    case 'NEW':
      return new Project();
    default:
      return state;
  }
};

export default projectReducer;
