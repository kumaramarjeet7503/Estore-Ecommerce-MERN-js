import {configureStore} from "@reduxjs/toolkit"  ;
import counterReducer from "./productSlice" ;

const store = configureStore({
    reducer:{
        counter:counterReducer 
    }
})

export default  store ;