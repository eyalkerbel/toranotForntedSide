import CONFIG from "../configs/env";
import shortid from 'shortid';
import { SET_TORANOT__ID } from "./toranotsAction";
import Haadafot from "../components/Haadafot";


export const INIT_MY_HAADAFOT = 'INIT_MY_HAADAFOT';
export const ADD_ONE_HAADAFA  = 'ADD_ONE_HAADAFA';
export const DELETE_ONE_HAADAFA = 'DELETE_ONE_HAADAFA';
export const CHANGE_ONE_HAADAFA = 'CHANGE_ONE_HAADAFA';
export const SET_ONE_ID = 'SET_ONE_ID';
export const INIT_MY_HAADAFOT_ENTIRE = 'INIT_MY_HAADAFOT_ENTIRE';
export function initMyHaadafot(haadafot)  {
  console.log("haadafot" , haadafot);
  return function(dispatch) {
   // console.log("get diff", this.props.myHaadafot);
    let final = 0;
    if(haadafot != []) {
    haadafot.forEach(item => {
      if(item != null) {
        let begin = new Date(item.begindate)
        let end = new Date(item.enddate)
        let sub = end.getTime() - begin.getTime()
        final += (sub / (1000 * 3600 * 24)) + 1
      }
    });
  }
    let f1 = 4 - final;
    console.log("f1 " , f1);
    dispatch(initMyHaadafotEntire(haadafot,f1));
  }
 
  }
  export function initMyHaadafotEntire(haadafot,number) {
    console.log("initEnite");
    return {
      type: INIT_MY_HAADAFOT,
      haadafot: haadafot,
      numRemaining:number
    };
  }

  export function HaadafaMiddleWar(json,action,numRemaining) {
    console.log("haadafaMiddlewar", json , action , numRemaining);
    var jsoned = {
        action: action,
        data: json
    }
    return function(dispatch) {

    if(action == "add") {
      var id  = shortid.generate();

      console.log("adding");
      fetch(CONFIG.API.SETHAADAFOT,{
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
            Authorization: "Bearer " + localStorage.getItem("jwt")
        },
        body: JSON.stringify(jsoned)
    }).then(dat => dat.json()).then(dat => {
      dispatch(setIdHaadafa(id,dat._id));
    });
    json["_id"] = id;
    dispatch(addHaadafa(json,numRemaining));
    }
    
    else {
      fetch(CONFIG.API.SETHAADAFOT,{
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
            Authorization: "Bearer " + localStorage.getItem("jwt")
        },
        body: JSON.stringify(jsoned)
    })
    if(action == "delete") {
      dispatch(deleteHaadafa(json,numRemaining));
    }
    if(action == "change") {
      dispatch(changeHaadafa(json,numRemaining));
    }
    }
   
  }
  } 

export function addHaadafa(json,numRemaining) {
    return {
      type: ADD_ONE_HAADAFA,
      haadafa: json,
      numRemaining: numRemaining
    }
  } 
  export function setIdHaadafa(idprev,idNew) {
    return {
      type: SET_ONE_ID,
      idPrev: idprev,
      idNew:idNew

    }
  } 

  export function deleteHaadafa(_id,numRemaining) {
    return {
      type: DELETE_ONE_HAADAFA,
      id: _id,
      numRemaining:numRemaining
    }
  } 

  export function changeHaadafa(json,numRemaining) {
    return {
      type: CHANGE_ONE_HAADAFA,
      haadafa: json,
      numRemaining:numRemaining
    }
  } 
