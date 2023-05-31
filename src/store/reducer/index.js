
import { combineReducers } from 'redux';
import PicadaysReducer from './picadayReducer';
import MembersListReducer from './Common'
import GraphDataReducer from './graph_data'
import MembersFilter from './member_filter'

const rootReducer = combineReducers({
  PicadaysReducer,
  MembersListReducer,
  GraphDataReducer,
  MembersFilter
});

export default rootReducer;