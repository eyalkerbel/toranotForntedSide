export const INIT_TORANOTS = 'INIT_TORANOTS';

// export const initUsers = function(users) {
//    return {

//    }
// }

export const initToranots = (toranotsThisMonth,toranotsNextMonth) => ({
    type: INIT_TORANOTS,
    toranotsThisMonth: toranotsThisMonth,
    toranotsNextMonth: toranotsNextMonth
  });