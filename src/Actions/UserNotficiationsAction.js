export const INIT_USER_NOTIFICATION = 'INIT_USER_NOTIFICATION';


export const initUserNotification = (notification) => (
    {
        type: INIT_USER_NOTIFICATION,
        notification: notification
    }
    );
    
