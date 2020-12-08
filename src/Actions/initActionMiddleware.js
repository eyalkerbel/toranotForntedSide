import CONFIG from "../configs/env";
import {loginAction} from "./loginAction";
import {initUsers} from "./usersAction";
import {initToranots} from "./toranotsAction";
import {initNotification} from "./NotificationAction";
import {initToranim} from "./toranimAction";
import {initMyHaadafot} from "./MyHaadafotAction";
import {initAllHaadafot} from "./AllHaadafotAction";
import {initUserNotification} from "./UserNotficiationsAction";
import {initPending} from "./PendingAction";
import {initJobs} from "./jobsAction";
import {SetColor,setAllColors} from "./toranimAction";
export const initActionMiddleware = (premssionlvl)  => {
  
  //  console.log("premss" , premssionlvl);
    
    return function(dispatch)  {
   // console.log("hellllo");
            fetch(CONFIG.API.GETDATAFORREDUX, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json;charset=utf-8",
                            Authorization: "Bearer " + localStorage.getItem("jwt")
                        }
            }).then(dat => dat.json()).then(data => {
                if(premssionlvl == "admin")  {
                console.log("initActionMiddleware" , data);
                dispatch(loginAction(data[0]));
                dispatch(initUsers(data[1]));
                dispatch(initToranots(data[2],data[3]));
                dispatch(initNotification(data[4]));
                dispatch(initToranim(data[5],data[6]));
                dispatch(initMyHaadafot(data[7]));
                dispatch(initAllHaadafot(data[8]));
                dispatch(initJobs(data[9]));
                dispatch(initPending());
                } else {
              //      console.log("initActionMiddlewarerrr" ,data);

                    dispatch(loginAction(data[0]));
                    dispatch(initUsers(data[1]));
                    dispatch(initToranots(data[2],data[3]));
                    dispatch(initUserNotification(data[4]));
                    dispatch(initToranim(data[5],data[6]));
                    dispatch(initMyHaadafot(data[7]));
                    dispatch(initAllHaadafot(data[8]));
                    dispatch(initJobs(data[9]));
                    dispatch(initPending());
                }
                var toranimThisMonth = data[5];
                var ids = [];
                for(var i=0;i<toranimThisMonth.length;i++) {
                   ids.push(toranimThisMonth[i].idUser);
                }

                var toranimNextMonth = data[6];
                // var temp = toranimNextMonth.map(el => !toranimThisMonth.idUser.includes(el.idUser));
                var tempAdd =[];
                for(var i=0;i<toranimNextMonth.length;i++) {
                  var equal = false;
                  for(var j=0;j<toranimThisMonth.length;j++) {
                    if(toranimThisMonth[j].idUser == toranimNextMonth[i].idUser) {
                      equal = true;
                    }
                  } 
                  if(equal == false) {
                    ids.push(toranimNextMonth[i].idUser);
                  }
                }
                console.log("ids "  , ids);
                console.log("toranim" , toranimThisMonth , toranimNextMonth);
                var colors = [];
                for(var i=0;i<data[1].length;i++) {
                  colors.push({idUser:data[1][i]._id,color:getRandomColor()});
                }
                dispatch(setAllColors(colors));


            });
        }
}

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}