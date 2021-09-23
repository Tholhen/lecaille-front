import {LOAD_PRODUCTS} from "../actions/product/action-type"

const initialState = {
    list: []
}

export default function ProductsReducer(state = initialState, action) {
    switch(action.type){
        case LOAD_PRODUCTS:
            return {list: action.payload}
        

        default:
            return state
        
    }
}