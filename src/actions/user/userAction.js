import {REFRESH_USER_INFOS, CONNECT_USER, LOGOUT_USER} from "./action-type"

export const connectUser = (user) => {
    return function(dispatch){
        dispatch({
            type: CONNECT_USER,
            payload: user
        })
    }
}

export const logoutUser = () => {
    return function(dispatch){
        dispatch({
            type: LOGOUT_USER,
            payload: null
        })
    }
}

export const refreshUserInfos = (user) => {
    return function(dispatch){
        dispatch({
            type: REFRESH_USER_INFOS,
            payload: user
        })
    }
}