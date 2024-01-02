import React, { Fragment, useEffect } from 'react'
import  './Home.css' ;
import Product from './Product.js'
import MetaData from '../layout/MetaData';
import {getAllProduct}  from "../../action/productAction" ;
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../Loader/Loader';
import { useAlert } from 'react-alert';


const Home = () => {

  // const alert  = useAlert() ;
  const {products,error,productCount,loading} = useSelector((state) => state.products ) ;
  const dispatch = useDispatch() ;
  
  useEffect(()=>{

        dispatch(getAllProduct()) ;
  },[dispatch])

  return (
    <Fragment > { loading ? <Loader></Loader> :  
    ( <Fragment>
      <MetaData title="E-store"></MetaData>
     
        <div className='banner' >
            <p>Welcome to E-store</p>
            <h1>FIND AMAZING PRODUCTS BELOW</h1>

            <a href='#container'>
                <button >Scroll  </button>
            </a>

        </div>
        <h2 className='homeHeading'>Featured Products</h2>
        <div className='container' id='container'>
         
              { products && products.map((product)=>{
              return <Product product = {product}></Product>
            }) } 
        </div>
    </Fragment>)}
    </Fragment>
  )
}

export default Home