import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProductDetails } from '../../action/productAction';
import { useParams } from 'react-router-dom';

const ProductDetails = () => {

    const {productDetail,error,loading} = useSelector((state) => state.productDetail ) ;
    
    const dispatch = useDispatch() ;
    const { productId } = useParams();
    useEffect(()=>{
        dispatch(getProductDetails(productId));
    },[dispatch,productId])


  return (
    <Fragment>
       { productDetail.images && productDetail.images.map((item)=>{
           return <img src={item.url}></img>
       }) }
    </Fragment>
  )
}

export default ProductDetails