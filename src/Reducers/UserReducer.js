const INITIAL_STATE = {};
  

const user = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case "Login":
      //  return {
      //      name: action.name,
      //      sn: action.sn,
      //      password: action.password
      //   };
        return action.user;
        case "LogOut":
         return INITIAL_STATE;
      default:
        return state;
    }

  }
  
  module.exports = user;