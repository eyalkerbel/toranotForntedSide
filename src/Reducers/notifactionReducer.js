const INITIAL_STATE = {};

const notification = (state = {}, action) => {
    switch(action.type) {
        case "INIT_NOTIFICATION":
            return action.notification;
        default:
            return state;       
    }
}
module.exports = notification;