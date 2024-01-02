import {createSlice} from "@reduxjs/toolkit" ;

const productSlice = createSlice({
    name:"product",
    initialState:{
        value:0
    },
    reducers:{
        increment:(state)=>{
            state.value = state.value++ ;
        },
        decrement:(state)=>{
            state.value = state.value-- ;
        }
    }
})

export const {increment,decrement} = productSlice.actions ;
export default  productSlice.reducer
