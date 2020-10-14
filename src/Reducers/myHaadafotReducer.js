const INITIAL_STATE = {};
 const myHaadafot = (state = INITIAL_STATE, action) => {
      switch (action.type) {
        case "INIT_MY_HAADAFOT":
         return action.haadafot
        default:
          return state;
      }
  
    }

    module.exports = myHaadafot;
    
    