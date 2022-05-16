import { combineReducers } from 'redux';
import currentUserReducer from './reducers/currentUserReducer';
import pendingReducer from './reducers/pendingReducer';

const rootReducer = combineReducers({
  currentUser: currentUserReducer,
  pending: pendingReducer,
});
export default rootReducer;
