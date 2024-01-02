import {PRODUCT_DETAILS_REQUEST,PRODUCT_DETAILS_SUCCESS,PRODUCT_DETAILS_FAIL,CLEAR_ERRORS} from '../constants/productDetailsConstants'
import axios  from 'axios'

/**
 * Return the product details 
 * @param {dispatch} dispatch : The redux dispatch function
 * @returns  {Promise<void>} - a promise will be resolved when the product details are fetched 
 */ 
export const getProductDetails = (id)=> async (dispatch) =>{

    try {
        dispatch({
            type : PRODUCT_DETAILS_REQUEST
        })
        const productDetails= await axios.get(`/api/v1/product/get/${id}`) ;
        dispatch({
            type : PRODUCT_DETAILS_SUCCESS,
            payload : productDetails
        })
    } catch (error) {
        dispatch({
            type : PRODUCT_DETAILS_FAIL,
            error : error.response.data.message
        })
    }
}

export const clearError = ()=> async (dispatch) =>{

        dispatch({
            type : CLEAR_ERRORS
        })
    
    }
