import {INIT_USER_NOTIFICATION} from "../Actions/UserNotficiationsAction";

export const userNotification = (state = {}, action) => {
    switch(action.type) {
        case INIT_USER_NOTIFICATION:
            return action.notification;
        default:
            return state;       
    }
}
