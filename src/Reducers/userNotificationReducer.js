import {INIT_USER_NOTIFICATION,DELETE_NOTIFICATION} from "../Actions/UserNotficiationsAction";

export const userNotification = (state = [], action) => {
    switch(action.type) {
        case INIT_USER_NOTIFICATION:
            return action.notification;
        case DELETE_NOTIFICATION: 
            return state.filter(el => el._id != action._id)
        default:
            return state;       
    }
    
}
