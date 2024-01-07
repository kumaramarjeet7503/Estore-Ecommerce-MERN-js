import React, { Fragment, useEffect, useState } from 'react'
import './Product.css'
import {useSelector,useDispatch} from 'react-redux' 
import { getAllProduct } from '../../action/productAction' 
import Loader from '../Loader/Loader'
import ProductCard from '../Home/ProductCard'
import { useParams } from 'react-router-dom'
import Pagination from "react-js-pagination";
const Product = () => {
  const dispatch = useDispatch() ;
  const [currentPage,setCurrentPage] = useState(1) ;

    const {products,error,loading,productCount,resultPerPage} = useSelector((state)=>{ return state.products}) ;
    const keyword = useParams().keyword ;
const setCurrentPageNo = (e)=>{
  setCurrentPage(e) ;
}

useEffect(()=>{
        dispatch(getAllProduct(keyword,currentPage)) ;
},[dispatch,keyword,currentPage])

  return (
    <Fragment>
        {loading ? <Loader></Loader> : <Fragment>
        <div className='products'>
            <h2 className='productHeading'>Products</h2>
            <div className='productItems'>
            {
                products && products.map((item)=>{
                  return  <ProductCard product={item} ></ProductCard>
                })
            }
           </div>
        </div>
        <div className='pagination'>
        <Pagination
        previousLabel="Previous"
        nextLabel="Next"
        containerClassName="pagination"
        totalItemsCount = {productCount}
        itemClass="page-item"
        linkClass="page-link"
        activeClassName="active"
        activePage = {currentPage}
        itemsCountPerPage = {resultPerPage}
        onChange={setCurrentPageNo}
        nextPageText='Next'
        prevPageText='Prev'
        firstPageText='First'
        lastPageText= 'Last'
      />
</div>

        </Fragment> }
    </Fragment>
  )
}

export default Product