import {configureStore, combineReducers, getDefaultMiddleware, applyMiddleware} from "@reduxjs/toolkit"  ;
import { thunk} from "redux-thunk" 
import { productReducer } from "./reducer/productReducer";
import { productDetailsReducer } from "./reducer/productDetailsReducer";

let initialState = {} ;
const middleWarThunk = [thunk] ;
const reducer = combineReducers({
    products : productReducer,
    productDetail:productDetailsReducer
})
const store = configureStore({
    reducer,
    initialState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
})

export default  store ;