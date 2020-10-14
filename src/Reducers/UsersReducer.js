 //import INIT_USERS from "../Actions/usersAction";

const INITIAL_STATE = {};
 const users = (state = INITIAL_STATE, action) => {
      switch (action.type) {
        case "INIT_USERS":
         return action.users
        default:
          return state;
      }
  
    }

    module.exports = users;
    
    