import {ADD_FREIND_TORAN,INIT_TORANIM,SET_COLOR,ADD_ALL_TORANS_THIS,ADD_ALL_TORANS_NEXT,DELETE_TORAN_THIS,
  DELETE_TORAN_NEXT,SET_ALL_COLORS,DELTET_ALL_ID} from "../Actions/toranimAction";

const INITIAL_STATE = {};
export const toranim = (state = INITIAL_STATE, action) => {
     switch (action.type) {
       case INIT_TORANIM:
        return {
           toranimThisMonth:action.toranimThisMonth,
           toranimNextMonth:action.toranimNextMonth,
           colors: [],
           pending: false
        }; 
        case ADD_ALL_TORANS_THIS:
          return {
            ...state,
            toranimThisMonth:state.toranimThisMonth.concat(action.arrayJobs)
            }
      case ADD_ALL_TORANS_NEXT:
        return {
          ...state,
          toranimNextMonth:state.toranimNextMonth.concat(action.arrayJobs)
          }
       case DELETE_TORAN_THIS: 
          return {
            ...state,
            toranimThisMonth: state.toranimThisMonth.filter(el => action.toran.includes(el._id)  == false  && el._id != undefined)
          }
         case DELETE_TORAN_NEXT: 
          return {
            ...state,
            // toranimNextMonth: state.toranimNextMonth.filter(el => el._id !== action.toran.item._id)
            toranimNextMonth: state.toranimNextMonth.filter(el =>  !action.toran.includes(el._id) && el._id != undefined)
          }
         case DELTET_ALL_ID:
           return {
             ...state,
             toranimNextMonth: state.toranimNextMonth.filter(el => el._id != undefined),
             toranimThisMonth: state.toranimThisMonth.filter(el => el._id != undefined)
           } 
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
      case SET_ALL_COLORS: 
        return {
          ...state, 
          colors: action.ids
        }
      case SET_COLOR:
        return {
          ...state, 
          colors:[...state.colors , {idUser: action.idUser,color: action.color}]
        }
      default:
          return state;  
      }
    }; 
    
 
   

  //  module.exports = toranim;