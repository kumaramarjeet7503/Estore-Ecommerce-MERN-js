import React, { Fragment } from 'react'
import  './Home.css' ;
import Product from './Product.js'
import MetaData from '../layout/MetaData';
import {getAllProduct}  from "../../action/productAction" ;

const product = {
  name:"Bule dfas",
  images : [{url : "https://d1xv5jidmf7h0f.cloudfront.net/circleone/images/products_gallery_images/Custom-Printed-T-Shirt-Round-Neck.jpg"}],
  price : "3000",
  __id : "dfkslaf",
}

const Home = () => {
  return (
    <Fragment>
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
          <Product product = {product}></Product>
          <Product product = {product}></Product>
          <Product product = {product}></Product>
          <Product product = {product}></Product>
          <Product product = {product}></Product>
          <Product product = {product}></Product>
          <Product product = {product}></Product>
          <Product product = {product}></Product>
        </div>
    </Fragment>
  )
}

export default Home