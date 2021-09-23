import {ALL_USERS} from "./action-type"

export const loadAllUsers = (users) => {
    return function(dispatch){
        dispatch({
            type: ALL_USERS,
            payload: users
        })
    }
}