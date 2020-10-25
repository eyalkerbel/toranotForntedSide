import {INIT_MY_HAADAFOT,ADD_ONE_HAADAFA,DELETE_ONE_HAADAFA,CHANGE_ONE_HAADAFA,SET_ONE_ID} from "../Actions/MyHaadafotAction";

const INITIAL_STATE = {};

 export const myHaadafot = (state = INITIAL_STATE, action) => {
      switch (action.type) {
        case INIT_MY_HAADAFOT:
          console.log("initReduxer");
         return {
           haadafot: action.haadafot,
           numRemaining: action.numRemaining
         }
         case ADD_ONE_HAADAFA:
           return   {
             numRemaining: (state.numRemaining+action.numRemaining),
            haadafot: [...state.haadafot,action.haadafa]
          };
        case DELETE_ONE_HAADAFA: 
        return{
          numRemaining:(state.numRemaining+action.numRemaining),
          haadafot: [...state.haadafot.filter(item => item._id != action.id)]
        };
        case CHANGE_ONE_HAADAFA:
          return{
            numRemaining:(state.numRemaining+action.numRemaining),
            haadafot: [...state.haadafot.map(item => {
              if(item._id != action.haadafa._id) {
                return item;
              } else {
                return action.haadafa;
              }
          })]};
        case SET_ONE_ID: 
        return{
          ...state,
          haadafot: [...state.haadafot.map(item => {
   //       console.log("ids" , item._id , " , " ,action.idPrev)
          if(item._id != action.idPrev) {
            return item;
          } else {
            console.log("found you");
            return {...item , _id:action.idNew};
          }
      })]};
        default:
          return state;
      }
  
    }

    
    