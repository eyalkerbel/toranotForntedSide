const INITIAL_STATE = {};

const notification = (state = {}, action) => {
    console.log("notification" ,  action);
    switch(action.type) {
        case "INIT_NOTIFICATION":
            return action.notification;
        default:
            return state;       
    }
}
module.exports = notification;