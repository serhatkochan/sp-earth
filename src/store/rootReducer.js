import { combineReducers } from 'redux';
import currentUserReducer from './reducers/currentUserReducer';

const rootReducer = combineReducers({
  currentUser: currentUserReducer,
});
export default rootReducer;
