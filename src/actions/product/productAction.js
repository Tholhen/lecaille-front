import {LOAD_PRODUCTS} from "./action-type"

export const loadProducts = (products) => {
    return function(dispatch){
        dispatch({
            type: LOAD_PRODUCTS,
            payload: products
        })
    }
}
