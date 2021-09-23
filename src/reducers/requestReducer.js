import { LOAD_ALL_REQUESTS } from "../actions/request/action-type"

const initialState = {
    list: []
}

export default function RequestReducer(state = initialState, action) {
    switch(action.type){
        case LOAD_ALL_REQUESTS :
            return {list: action.payload}

        default :
            return state
    }
}