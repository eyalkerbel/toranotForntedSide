 //import INIT_USERS from "../Actions/usersAction";
 import {CHANGE_POINTS} from "../Actions/usersAction";
const INITIAL_STATE = {};
 export const users = (state = INITIAL_STATE, action) => {
      switch (action.type) {
        case "INIT_USERS":
         return action.users;
         case CHANGE_POINTS: 
         return state.map(el => {
           if(el._id == action.id) {
             if(action.actionP == "add") {
              return  {...el , points: el.points + 1}
             } else {
              return  {...el , points: el.points - 1}
             }
           } else {
             return el;
           }
         })
        default:
          return state;
      }
  
    }

    
    