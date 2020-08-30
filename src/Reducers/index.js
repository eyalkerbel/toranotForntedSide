import { combineReducers } from 'redux';
// import user from './UserReducer';
// import notification from './notifactionReducer';

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


const user = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case "Login":
       return {
           user: action.user,
           sn: action.sn,
           password: action.password
        };
        case "LogOut":
         return INITIAL_STATE;
      default:
        return state;
    }

  }
  

export default combineReducers({
    user,
    notification
});