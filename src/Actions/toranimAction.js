import CONFIG from "../configs/env";
import shortid from 'shortid';
// import { element } from "react-bootstrap/node_modules/@types/prop-types";

export const INIT_TORANIM = 'INIT_TORANIM';
export const ADD_FREIND_TORAN = 'ADD_FREIND_TORAN';
export const SET_COLOR = "SET_COLOR";
export const SET_ALL_COLORS = " SET_ALL_COLORS";
export const ADD_TORAN = "ADD_TORAN";
export const DELETE_TORAN_THIS = "DELETE_TORAN_THIS";
export const DELETE_TORAN_NEXT = "DELETE_TORAN_NEXT";
export const ADD_ALL_TORANS_THIS = "ADD_ALL_TORANS_THIS";
export const ADD_ALL_TORANS_NEXT = "ADD_ALL_TORANS_NEXT";
export const DELTET_ALL_ID = 'DELTET_ALL_ID';
export const SET_ID = "SET_ID";

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
export  function middleWare(arrayofData,monthValue) {
  console.log("arrayOfData" , arrayofData);
  return async (dispatch) => {
    const arrayDeleteThis = await getDeleteArray(arrayofData,0);
    const arrayDeleteNext = await getDeleteArray(arrayofData,1);

  var  arrayUsersJson = {arrayUsers:arrayofData};
  console.log("arrayDeleteThuis" ,arrayDeleteThis , arrayDeleteNext );
// await arrayDeleteThis.map(el =>    dispatch(deleteToranThis(el)));
// await arrayDeleteNext.map(el => dispatch(deleteToranNext(el)));
if(arrayDeleteThis.length != 0 ){
await dispatch(deleteToranThis(arrayDeleteThis));
} 
if(arrayDeleteNext.length != 0 ) {
await dispatch(deleteToranNext(arrayDeleteNext))
}
    console.log("finsh-delete");
    fetch(CONFIG.API.SENDCURRENTTORANIM , {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
            Authorization: "Bearer " + localStorage.getItem("jwt")
        },
        body: JSON.stringify(arrayUsersJson)
    }).then(dat => dat.json()).then(async elementAdd => {
      console.log("elementAdd" , elementAdd);
      let element = [[] , []];
      element =  await divideElement(elementAdd);
      console.log("element" , element);
     console.log("elemnt")
     if(element[0].length != 0) {
    await dispatch(addAllToransThis(element[0],0));
     } 
     if(element[1].length != 0) {
      await dispatch(addAllToransNext(element[1] , 0));
    }
    dispatch(deleteAllWithOutId());


    //   elementAdd.map( elemnt => {
    //   if(elemnt.monthTab == 0) {
    //  await dispatch(addAllToransThis(elemnt,arrayDeleteThis.length));
    //   } else if(elemnt.monthTab == 1) {
    //    await dispatch(addAllToransNext(elemnt,arrayDeleteNext.length));
    //   }
    //  });
    });
//   for( var i=0;i<arrayDeleteThis.length;i++) {
//      dispatch(deleteToranThis( arrayDeleteThis[i]));
//    }
//    for( var i=0;i<arrayDeleteNext.length;i++) {
//     dispatch(deleteToranNext(arrayDeleteNext[i]));
//   }
 }

}
 function divideElement(element) {
    var temp = [[] , []];
    element.map( async elemnt => {
       temp[elemnt.monthTab].push(elemnt);
    });
    return temp;
  }
  async function getDeleteArray(array,tabMonth) {
    var temp = [];
    for(const elemnt of array) {
      if(elemnt.isChosen == true && elemnt.monthValue == tabMonth) {
        temp.push(elemnt.item._id);
      }
    }
    return temp;
  }

export function deleteAllWithOutId() {
  return {
    type: DELTET_ALL_ID
  }
}

export function addToran(toran) {
  return {
    type: ADD_TORAN,
    toran:toran
  }
}
export function addAllToransThis(arrayJobs,tab) {
  return {
    type:ADD_ALL_TORANS_THIS,
    arrayJobs:arrayJobs,
    tab: tab
  }
}
export function addAllToransNext(arrayJobs,tab) {
  return {
    type:ADD_ALL_TORANS_NEXT,
    arrayJobs:arrayJobs,
    tab:tab
  }
}
export function deleteToranThis(toran) {
  return {
    type: DELETE_TORAN_THIS,
    toran:toran
  }
}
export function deleteToranNext(toran) {
  return {
    type: DELETE_TORAN_NEXT,
    toran:toran
  }
}





export const initToranim = (toranimThisMonth,toranimNextMonth) => ({
    type: INIT_TORANIM,
    toranimThisMonth: toranimThisMonth,
    toranimNextMonth: toranimNextMonth
  });
  export const addIdToranim = (toranId,mineId) => ({
    type: ADD_FREIND_TORAN,
    toranId: toranId,
    mineId:mineId
  });

  export function setAllColors(ids) {
    return {
        type: SET_ALL_COLORS,
        ids: ids
    }
  }

  export function setColor(idUser,color,monthTab) {
    console.log("setColor");
    return {
      type: SET_COLOR,
      idUser:idUser,
      color:color,
      monthTab: monthTab
    }
  }
