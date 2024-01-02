import {configureStore, combineReducers} from "@reduxjs/toolkit"  ;
import { thunk} from "redux-thunk" 
import { productReducer } from "./reducer/productReducer";

let initialState = {} ;
const middleWarThunk = [thunk] ;
const reducer = combineReducers({
    products : productReducer
})
const store = configureStore({
    reducer,
    initialState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(...middleWarThunk),
    devTools: true
})

export default  store ;