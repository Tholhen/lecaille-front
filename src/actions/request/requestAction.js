import {LOAD_ALL_REQUESTS} from "./action-type"

export const loadAllRequests = (requests) => {
    return function(dispatch){
        dispatch({
            type: LOAD_ALL_REQUESTS,
            payload: requests
        })
    }
}