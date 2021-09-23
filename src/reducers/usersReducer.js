import {ALL_USERS} from "../actions/users/action-type"

const initialState = {
    users: []
}

export default function UserReducer(state = initialState, action) {
    switch(action.type) {

        case ALL_USERS:
            return {users: action.payload}
        
        
        default:
            return state
        
    }
}