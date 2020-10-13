import CONFIG from "../configs/env";
import {loginAction} from "./loginAction";
import {initUsers} from "./usersAction";
import {initToranots} from "./toranotsAction";
import {initNotification} from "./NotificationAction";
import {initToranim} from "./toranimAction";
import {initMyHaadafot} from "./MyHaadafotAction";
import {initAllHaadafot} from "./AllHaadafotAction";
export const initActionMiddleware = ()  => {
    return function(dispatch)  {
    fetch(CONFIG.API.GETDATAFORREDUX, {
        method:"POST",
              headers: {
                "Content-Type": "application/json;charset=utf-8",
                Authorization: "Bearer " + localStorage.getItem("jwt")
            }}).then(dat => dat.json()).then(data => {

                console.log("initActionMiddleware" , data);
                dispatch(loginAction(data[0]));
                dispatch(initUsers(data[1]));
                dispatch(initToranots(data[2],data[3]));
                dispatch(initNotification(data[4]));
                dispatch(initToranim(data[5],data[6]));
                dispatch(initMyHaadafot(data[7]));
                dispatch(initAllHaadafot(data[8]));
            });
        }
}