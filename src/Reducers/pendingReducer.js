import {INIT_PENDING} from "../Actions/PendingAction";
export const pending = (state = {}, action) => {
    switch(action.type) {
        case INIT_PENDING:
            return true;
        default:
            return state;       
    }
}
