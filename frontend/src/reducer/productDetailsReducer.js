import {PRODUCT_DETAILS_REQUEST,PRODUCT_DETAILS_SUCCESS,PRODUCT_DETAILS_FAIL,CLEAR_ERRORS} from '../constants/productDetailsConstants'

export const productDetailsReducer = (state = {productDetail : []},action) => {
    switch(action.type){
        case PRODUCT_DETAILS_REQUEST :
            return {
                loading : true,
                productDetail : []
            }
        case PRODUCT_DETAILS_SUCCESS :
            return {
                loading : false,
                productDetail : action.payload.data.product
            }  
        case PRODUCT_DETAILS_FAIL :
            return {
                loading : false,
                error : action.payload
            }  
        case CLEAR_ERRORS :
            return {
                ...state,
                error :null
            }  
        default :
            return state
    }
}
