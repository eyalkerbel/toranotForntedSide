const INITIAL_STATE = {};
  

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
  
  export default user;