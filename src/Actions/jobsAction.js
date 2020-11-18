import { job } from "../Reducers/jobReducer";
import CONFIG from "../configs/env";
export const INIT_JOBS = 'INIT_JOBS';
export const ADD_JOB = 'ADD_JOB';
export const DELETE_JOB = 'DELETE_JOB';
export const CHANGE_JOB_NAME = "CHANGE_JOB_NAME";
export const CHANGE_JOB_AMOUNTT_TORANIM = "CHANGE_JOB_AMOUNTT_TORANIM";
export const CHANGE_JOB_DESCRIPTION = "CHANGE_JOB_DESCRIPTION";
export const DELETE_NOT_COMPLETED = "DELETE_NOT_COMPLETED";
export const SET_ID_JOB = "SET_ID_JOB"


export function initJobs(jobs) {
    return {
        jobs:jobs,
        type: INIT_JOBS
    }
}
export function middleWareJob(action , values , key) {
    console.log("middleWareJob" , action , values, key )
    return function(dispatch) {
     if(action == "add") {
     dispatch(addJob(values));
    fetch(CONFIG.API.ADDJOBS, {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
            Authorization: "Bearer " + localStorage.getItem("jwt")
          },
         body: JSON.stringify({action,values})
    }).then(dat => dat.json()).then(element => {
        console.log("element" , element);
        dispatch(setIdJob(values._id,element._id))
    });
    }
    if(action == "delete") {
        console.log("delete me");
        dispatch(deleteJob(values._id));
        fetch(CONFIG.API.ADDJOBS, {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
                Authorization: "Bearer " + localStorage.getItem("jwt")
              },
             body: JSON.stringify({action,values})
        });
    } else {
        if(key == "name") {
            dispatch(changeName(values._id,values.value));
        } else if(key == "amountToranim") {
            dispatch(changeAmountToranim(values._id,values.value));
        } else {
            dispatch(changeDescription(values._id,values.value));
        }
        fetch(CONFIG.API.ADDJOBS, {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
                Authorization: "Bearer " + localStorage.getItem("jwt")
              },
             body: JSON.stringify({action,values,key})
        });
    }
}
}

export function setIdJob(idPrev,idNew) {
    return {
        type: SET_ID_JOB,
        idPrev: idPrev,
        idNew: idNew
    }
}


export function changeJob(id,value,key) {
    return function(dispatch){
        if(key == "name") {
            dispatch(changeName(id,value));
        } else if(key == "description") {
            dispatch(changeDescription(id,value));
        } else if(key == "amountToranim") {
            dispatch(changeAmountToranim(id,value));
        }
    }
}

export function changeName(id,value) {
    return {
        type: CHANGE_JOB_NAME,
        id:id,
        value:value
    }
}
export function changeAmountToranim(id,value) {
    return {
        type: CHANGE_JOB_AMOUNTT_TORANIM,
        id:id,
        value:value
    }
}
export function changeDescription(id,value) {
    return {
        type: CHANGE_JOB_DESCRIPTION,
        id:id,
        value:value
    }
}



export function addJob(job) {
    console.log("addJob" , job);
    return {
        job:job,
        type: ADD_JOB
    }
}

export function deleteJob(id) {
    return {
        id:id,
        type:DELETE_JOB
    }
}

export function deleteNotCompleted() {
    return {
        type: DELETE_NOT_COMPLETED
    }
}