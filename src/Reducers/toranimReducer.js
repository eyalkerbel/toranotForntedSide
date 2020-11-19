import {ADD_FREIND_TORAN,INIT_TORANIM,SET_COLOR} from "../Actions/toranimAction";

const INITIAL_STATE = {};
export const toranim = (state = INITIAL_STATE, action) => {
     switch (action.type) {
       case INIT_TORANIM:
        return {
           toranimThisMonth:action.toranimThisMonth,
           toranimNextMonth:action.toranimNextMonth,
           colors: []
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
      case SET_COLOR:
        return {
          ...state, 
          colors:[...state.colors , {idUser: action.idUser,color: action.color}]
        }
        // if(action.monthTab == 0) {
        //   return {
        //     ...state,
        //     toranimThisMonth: state.toranimThisMonth.map(item => {
        //       if(action.id != item._id) {
        //         return item;
        //       } else {
        //         return {...item,item,color:action.color};
        //       }
        //     })
        //   };
        // } else {
        //   return {
        //   ...state,
        //   toranimNextMonth: state.toranimNextMonth.map(item => {
        //     if(action.id != item._id) {
        //       return item;
        //     } else {
        //       return {...item,color:action.color};
        //     }
        //   })
        // };
        //}
      default:
          return state;  
      }
    }; 
    
 
   

  //  module.exports = toranim;