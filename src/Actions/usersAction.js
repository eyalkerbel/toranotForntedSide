export const INIT_USERS = 'INIT_USERS';
export const INCREASE_POINTS = 'INCREASE_POINTS';
export const DECREASE_POINTS = 'DECREASE_POINTS';
export const CHANGE_POINTS = 'CHANGE_POINTS';
// export const initUsers = function(users) {
//    return {

//    }
// }
export function changePoints(id,actionP) {
  return {
  type: CHANGE_POINTS,
  id: id,
  actionP: actionP
  };
}

export const initUsers = (users) => ({
    type: INIT_USERS,
    users: users
  });