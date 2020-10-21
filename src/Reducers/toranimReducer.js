import {ADD_FREIND_TORAN,INIT_TORANIM} from "../Actions/toranimAction";

const INITIAL_STATE = {};
export const toranim = (state = INITIAL_STATE, action) => {
     switch (action.type) {
       case INIT_TORANIM:
        return {
           toranimThisMonth:action.toranimThisMonth,
           toranimNextMonth:action.toranimNextMonth
        }; 
      case ADD_FREIND_TORAN:
        return {
          ...state,
          toranimNextMonth: state.toranimNextMonth.map(item => {
            if(action.mineId != item.idUser) {
              return item;
            } else {
              console.log("succseed");
              return {...item , friendId:action.toranId}
           }
           })

        };
      default:
          return state;  
      }
    }; 
    
 
   

  //  module.exports = toranim;