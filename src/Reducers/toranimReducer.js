

const INITIAL_STATE = {};
const toranim = (state = INITIAL_STATE, action) => {
     switch (action.type) {
       case "INIT_TORANIM":
        return {
           toranimThisMonth:action.toranimThisMonth,
           toranimNextMonth:action.toranimNextMonth
        }; 
       default:
         return state;
     }
 
   }
   module.exports = toranim;