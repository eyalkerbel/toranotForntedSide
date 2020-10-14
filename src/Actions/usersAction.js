export const INIT_USERS = 'INIT_USERS';

// export const initUsers = function(users) {
//    return {

//    }
// }

export const initUsers = (users) => ({
    type: INIT_USERS,
    users: users
  });