export const INIT_TORANIM = 'INIT_TORANIM';


export const initToranim = (toranimThisMonth,toranimNextMonth) => ({
    type: INIT_TORANIM,
    toranimThisMonth: toranimThisMonth,
    toranimNextMonth: toranimNextMonth
  });