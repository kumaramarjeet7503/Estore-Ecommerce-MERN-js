import {PRODUCT_LIST_REQUEST,PRODUCT_LIST_SUCCESS,PRODUCT_LIST_FAIL,CLEAR_ERRORS} from "../constants/productConstants"

export const productReducer = (state = { products : [] }, action) => {
    switch(action.type){
        case PRODUCT_LIST_REQUEST :
            return{
                loading: true,
                products: []
            } 
        case PRODUCT_LIST_SUCCESS :
            return{
                loading: false,
                products: action.payload.data.products,
                productCount : action.payload.data.productCount,
                resultPerPage: action.payload.data.resultPerPage
            } 
        case PRODUCT_LIST_FAIL :
            return{
                loading: false,
                error: action.payload
            } 
        case CLEAR_ERRORS :
            return{
                ...state,
                error: null
            } 
        default : 
            return state ;
    }
}