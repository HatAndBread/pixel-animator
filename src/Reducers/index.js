import { combineReducers } from 'redux';
import settingsOpenReducer from './settingsOpenReducer';
import canvasHeightReducer from './canvasHeightReducer';
import canvasWidthReducer from './canvasWidthReducer';
import projectReducer from './projectReducer';

const allReducers = combineReducers({
  settingsOpen: settingsOpenReducer,
  canvasWidth: canvasWidthReducer,
  canvasHeight: canvasHeightReducer,
  currentProject: projectReducer
});

export default allReducers;
