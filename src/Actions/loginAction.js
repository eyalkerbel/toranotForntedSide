


export const loginAction = (user,sn,password) =>  ({
    type: "Login",
    user:user,
    sn: sn,
    password:password
  });


  export const logoutAction = () => ({
    type: "Logout"
  });
