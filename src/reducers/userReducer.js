import {REFRESH_USER_INFOS, CONNECT_USER, LOGOUT_USER} from "../actions/user/action-type"

const initialState = {
    infos: {},
    isLogged: false
}

export default function UserReducer(state = initialState, action) {
    switch(action.type) {
        case CONNECT_USER:
            return {infos: action.payload, isLogged: true}
        

        case LOGOUT_USER:
            return initialState
        
        
        case REFRESH_USER_INFOS:
            return {infos: action.payload, isLogged: true}
        

        default:
            return state
        
    }
}