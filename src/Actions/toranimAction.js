export const INIT_TORANIM = 'INIT_TORANIM';
export const ADD_FREIND_TORAN = 'ADD_FREIND_TORAN';
export const SET_COLOR = "SET_COLOR";

export function middleWare() {
 
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

  export function setColor(idUser,color,monthTab) {
    console.log("setColor");
    return {
      type: SET_COLOR,
      idUser:idUser,
      color:color,
      monthTab
    }
  }
