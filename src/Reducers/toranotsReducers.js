  // import INIT_TORANOTS from "../Actions/toranotsAction";
  const INIT_TORANOTS = require("../Actions/toranotsAction");

 const INITIAL_STATE = {};
 const toranots = (state = INITIAL_STATE, action) => {
    console.log("user" , action.type);
      switch (action.type) {
        case "INIT_TORANOTS":
         return {
            toranotsThisMonth:action.toranotsThisMonth,
            toranotsNextMonth:action.toranotsNextMonth
         }; 
        default:
          return state;
      }
  
    }

    module.exports = toranots;
    