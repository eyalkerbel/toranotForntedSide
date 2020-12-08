import CONFIG from ".././configs/env";

export const INIT_USER_NOTIFICATION = 'INIT_USER_NOTIFICATION';
export const DELETE_NOTIFICATION = 'DELETE_NOTIFICATION';
export const initUserNotification = (notification) => (
    {
        type: INIT_USER_NOTIFICATION,
        notification: notification
    }
    );
     
export function deleteNotficiationMiddleWare(_id) {
    console.log("deleteNotificat" , _id);
    return function (dispatch) {
        fetch(CONFIG.API.DELETENOTIFICATIONID , {
            method: "POST",
            headers: {
            "Content-Type": "application/json;charset=utf-8",
            Authorization: "Bearer " + localStorage.getItem("jwt")
        },
        body: JSON.stringify({_id:_id})
        }).then(dat=>dat.json());
        dispatch(deleteNotification(_id));
    }
}

export function deleteNotification(_id) {
    return {
        type:DELETE_NOTIFICATION,
        _id:_id
    }
}