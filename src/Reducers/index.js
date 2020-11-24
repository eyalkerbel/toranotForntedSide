import { combineReducers } from 'redux';
import user from './UserReducer';
import {users} from './UsersReducer';
import {toranots} from "./toranotsReducers";
import notification from './notifactionReducer';
import {toranim} from "./toranimReducer";
import {myHaadafot} from "./myHaadafotReducer";
import allHaadafot from "./allHaadafotReducer";
import {userNotification} from "./userNotificationReducer";
import {pending} from "./pendingReducer";
import {jobs} from "./jobReducer";
export default combineReducers({
    user,
    users,
    toranim,
    toranots,
    myHaadafot,
    allHaadafot,
    notification,
    userNotification,
    jobs,
    pending
});