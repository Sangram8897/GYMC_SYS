
import { combineReducers } from 'redux';
import PicadaysReducer from './picadayReducer';
import MembersListReducer from './Common'

const rootReducer = combineReducers({
  PicadaysReducer,
  MembersListReducer
});
export default rootReducer;