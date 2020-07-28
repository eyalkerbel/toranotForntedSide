const INITIAL_STATE = {};

const notification = (state = [{}], action) => {
    switch(action.type) {
        case "SetNotification":
            console.log("date" , action.date)
            return [...state,
                {
                 date: action.date
                } ];
        default:
            return state;       
    }
}
module.exports = notification;