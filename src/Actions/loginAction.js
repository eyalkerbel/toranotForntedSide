


export const loginAction = (name,sn,password) =>  ({
    type: "Login",
    name:name,
    sn: sn,
    password:password
  });


  export const logoutAction = () => ({
    type: "Logout"
  });
