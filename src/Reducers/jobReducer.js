import {INIT_JOBS,DELETE_JOB,ADD_JOB,CHANGE_JOB_NAME,CHANGE_JOB_DESCRIPTION,CHANGE_JOB_AMOUNTT_TORANIM,DELETE_NOT_COMPLETED,SET_ID_JOB} from "../Actions/jobsAction";
const INITIAL_STATE = {};
export const jobs = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case INIT_JOBS:
            return action.jobs;
        case ADD_JOB:
            return state.concat(action.job);
        case CHANGE_JOB_NAME:
            return state.map(element => {
              //  console.log(element._id , action.id);
                if(element._id == action.id) {
                    return {...element , name: action.value }
                } else {   return element; } })
         case CHANGE_JOB_DESCRIPTION:
                return state.map(element => {
                    if(element._id == action.id) {
                        return {...element , description: action.value }
                    } else {
                        return element;}   });
        case CHANGE_JOB_AMOUNTT_TORANIM:
                    return state.map(element => {
                                if(element._id == action.id) {
                                    return {...element , numToranotPerDay: action.value }
                                } else {
                                    return element;}   });
        case DELETE_NOT_COMPLETED:
            return state.map(element=> {
                    if(element.name != "" && element.numToranotPerDay != 0 ) {
                        return element;
                    }
            });
        case SET_ID_JOB:
            return state.map(element => {
                if(element._id == action.idPrev) {
                    return {...element,_id:action.idNew};
                }
            });
        case DELETE_JOB:
            return state.filter(item => item._id != action.id)
        default:
            return state;
    }
}

