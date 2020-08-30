import { combineReducers } from 'redux';
import user from './UserReducer';
import notification from './notifactionReducer';
export default combineReducers({
    user,
    notification

});