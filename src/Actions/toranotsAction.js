import CONFIG from "../configs/env";
import shortid from 'shortid';

export const INIT_TORANOTS = 'INIT_TORANOTS';
export const ADD_TORANOT_THIS_MONTH = 'ADD_TORANOT_THIS_MONTH';
export const ADD_TORANOT_NEXT_MONTH = 'ADD_TORANOT_NEXT_MONTH';
export const SET_TORANOT__ID = 'SET_TORANOT__ID';
export const SET_TORANOT_ID_NEXT_MONTH = 'SET_TORANOT_ID_NEXT_MONTH';

export const DELETE_TORANOT_THIS_MONTH = "DELETE_TORANOT_THIS_MONTH";
export const DELETE_TORANOT_NEXT_MONTH = "DELETE_TORANOT_NEXT_MONTH";


// export const initUsers = function(users) {
//    return {

//    }
// }

export const initToranots = (toranotsThisMonth,toranotsNextMonth) => ({
    type: INIT_TORANOTS,
    toranotsThisMonth: toranotsThisMonth,
    toranotsNextMonth: toranotsNextMonth
  });
  export const addToranotThisMonth = (toranot) => ({
    type: ADD_TORANOT_THIS_MONTH,
    toranot: toranot
  });
  export const setToranotID = (idPrev,idNew,monthTab) => ({
    type: SET_TORANOT__ID,
    idPrev:idPrev,
    idNew:idNew,
    monthValue:monthTab
  });
 

export const addToranotNextMonth = (toranot) => ({
    type: ADD_TORANOT_NEXT_MONTH,
    toranot: toranot
  });
  export const deleteToranotThisMonth = (toranot) => ({
    type: DELETE_TORANOT_THIS_MONTH,
    toranot: toranot
  });
  export const deleteToranotNextMonth = (toranot) => ({
    type: DELETE_TORANOT_NEXT_MONTH,
    toranot: toranot
  });


  export function addToranot(toranot,dataForRedux)  {
  var id  = shortid.generate();
    dataForRedux["_id"] = id;

    return function(dispatch) {
      fetch(CONFIG.API.SETTORANOT, {
              method: "POST",
              headers: {
              "Content-Type": "application/json;charset=utf-8",
              Authorization: "Bearer " + localStorage.getItem("jwt")
          },
          body: JSON.stringify(toranot)
      }).then(data => data.json()).then((jsoned) => {
        console.log("setTotanotIdInMiddleware") 
         dispatch(setToranotID(id,jsoned._id,jsoned.monthTab))
  //  jsoned["userDetails"] = toranot.userDetails;
  //          console.log("new element" , jsoned);
  //         if(toranot.monthTab == 0) {
  //           dispatch(addToranotThisMonth(jsoned));
  //       } else {
  //         dispatch(addToranotNextMonth(jsoned))
  //       }
    });
        //  jsoned["userDetails"] = toranot.userDetails;
        //   console.log("new element" , jsoned);

        
          if(toranot.monthTab == 0) {
            dispatch(addToranotThisMonth(dataForRedux));
        } else {
          dispatch(addToranotNextMonth(dataForRedux))     
         }
  }
}
export function deleteToranot(toranot,monthValue) {
  return function(dispatch) {
    fetch(CONFIG.API.DELETETORANOT, {
      method: "POST",
      headers: {
          "Content-Type": "application/json;charset=utf-8",
          Authorization: "Bearer " + localStorage.getItem("jwt")
      },
      body: JSON.stringify(toranot)
  });
   if(monthValue == 0){
    dispatch(deleteToranotThisMonth(toranot));
  } else {
    dispatch(deleteToranotNextMonth(toranot));
  }
}
}



