const INITIAL_STATE = {};
 const AllHaadafot = (state = INITIAL_STATE, action) => {
      switch (action.type) {
        case "INIT_ALL_HAADAFOT":
         return action.haadafot
        default:
          return state;
      }
  
    }

    module.exports = AllHaadafot;
    
    