import {combineReducers } from "redux"
import UserReducer from "./userReducer"
import UsersReducer from "./usersReducer"
import ProductsReducer from "./productsReducer"
import RequestReducer from "./requestReducer"

const rootReducer = combineReducers({
    user: UserReducer,
    users: UsersReducer,
    products: ProductsReducer,
    requests: RequestReducer
})

export default rootReducer