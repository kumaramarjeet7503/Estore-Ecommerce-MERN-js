import axios from "axios" ;
import {PRODUCT_LIST_REQUEST ,PRODUCT_LIST_SUCCESS ,PRODUCT_LIST_FAIL , CLEAR_ERRORS} from "../constants/productConstants" ;

export  const getAllProduct = async (dispatch) => {
    try {
        dispatch({
            type: PRODUCT_LIST_REQUEST,
        })

        const data = axios.get("/api/v1/products") ;

        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload : data
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload : error.message
        })
    }
} 

export  const clearError = async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS,
    })

}