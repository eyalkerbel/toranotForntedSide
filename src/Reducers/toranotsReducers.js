  // import INIT_TORANOTS from "../Actions/toranotsAction";
  // const INIT_TORANOTS = require("../Actions/toranotsAction");
  import {INIT_TORANOTS,ADD_TORANOT_THIS_MONTH,ADD_TORANOT_NEXT_MONTH,DELETE_TORANOT_NEXT_MONTH,DELETE_TORANOT_THIS_MONTH,SET_TORANOT__ID} from "../Actions/toranotsAction";
 const INITIAL_STATE = {};
 export const toranots = (state = INITIAL_STATE, action) => {
      switch (action.type) {
        case INIT_TORANOTS:
         return {
            toranotsThisMonth:action.toranotsThisMonth,
            toranotsNextMonth:action.toranotsNextMonth
         };
         case ADD_TORANOT_THIS_MONTH:
           return { 
            ...state,
            toranotsThisMonth:[...state.toranotsThisMonth, action.toranot]
          };
         case ADD_TORANOT_NEXT_MONTH:
           return {
            ...state,
            toranotsNextMonth:[...state.toranotsNextMonth, action.toranot]
           }
          case DELETE_TORANOT_THIS_MONTH:
            return {
              ...state,
              toranotsThisMonth: state.toranotsThisMonth.filter(item => item._id != action.toranot.id)
            }
            case DELETE_TORANOT_NEXT_MONTH:
              return {
                ...state,
                toranotsNextMonth: state.toranotsNextMonth.filter(item => item._id != action.toranot.id)
              }
              case SET_TORANOT__ID:
                console.log("setToranotId");
                if (action.monthValue == 0) {
                  return {
                  ...state,
                  toranotsThisMonth: state.toranotsThisMonth.map(item  => {
                    if(action.idPrev != item._id) {
                      return item;
                    } else {
                      return {...item , _id:action.idNew}
                   }
                  })
                  }
                } else {
                    return {
                      ...state,
                      toranotsNextMonth: state.toranotsNextMonth.map(item  => {
                        if(action.idPrev != item._id) {
                          return item;
                        } else {
                          return {...item , _id:action.idNew}
                       }
                      })
                    }
                  }
            default:
          return state;
      }
  
    }

    // module.exports = toranots;
    