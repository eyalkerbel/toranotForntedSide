export const INIT_TORANIM = 'INIT_TORANIM';
export const ADD_FREIND_TORAN = 'ADD_FREIND_TORAN';

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


