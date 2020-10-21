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
  //console.log("friendItem" , toranot.friendDetails);
    dataForRedux["_id"] = id;
    var idFriend = shortid.generate();
   // console.log("toranotObject" , toranot);
    return function(dispatch) {
      fetch(CONFIG.API.SETTORANOT, {
              method: "POST",
              headers: {
              "Content-Type": "application/json;charset=utf-8",
              Authorization: "Bearer " + localStorage.getItem("jwt")
          },
          body: JSON.stringify(toranot)
      }).then(data => data.json()).then((jsoned) => {
     // console.log("jsoned" , jsoned);
        if(jsoned.length == 1) {
      //  console.log("setTotanotIdInMiddleware") 
         dispatch(setToranotID(id,jsoned[0]._id,jsoned[0].monthTab))
         } else {
          dispatch(setToranotID(id,jsoned[0]._id,jsoned[0].monthTab))
          dispatch(setToranotID(idFriend,jsoned[1]._id,jsoned[1].monthTab))

         }

 
    });     
          if(toranot.monthTab == 0) {
            dispatch(addToranotThisMonth(dataForRedux));
            if(toranot.friendDetails != null) {
              var dataReduxFriend = {
                date:toranot.date,
                monthTab:toranot.monthTab,
                idUser: toranot.friendDetails.userDetails._id,
                userStatus: "unknown",
                availableForExchange: true,
                userDetails: toranot.friendDetails.userDetails,
                toran: toranot.toran,
                _id: idFriend
            };
            //  var dataReduxFriend = dataForRedux;
            //  dataReduxFriend["idUser"] = toranot.friendDetails.userDetails._id;
            //   dataReduxFriend["_id"] = idFriend;
            //  dataReduxFriend["userDetails"] = toranot.friendDetails.userDetails;
              dispatch(addToranotThisMonth(dataReduxFriend));

            }
        } else {
          dispatch(addToranotNextMonth(dataForRedux))    
          if(toranot.friendDetails != null) {
            var dataReduxFriend = {
              date:toranot.date,
              monthTab:toranot.monthTab,
              idUser: toranot.friendDetails.userDetails._id,
              userStatus: "unknown",
              availableForExchange: true,
              userDetails: toranot.friendDetails.userDetails,
              toran: toranot.toran,
              _id: idFriend
          };
         //   var dataReduxFriend = dataForRedux;
            // dataReduxFriend["idUser"] = toranot.friendDetails.userDetails._id;
            // dataReduxFriend["_id"] = idFriend;
            // dataReduxFriend["userDetails"] = toranot.friendDetails.userDetails;
            dispatch(addToranotNextMonth(dataReduxFriend));

          } 
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



