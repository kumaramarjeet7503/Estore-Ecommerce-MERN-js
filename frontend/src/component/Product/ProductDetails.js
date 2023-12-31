import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProductDetails } from '../../action/productAction';
import { useParams } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import './ProductDetails.css'
import StarRatingComponent from 'react-star-rating-component';
import ReviewCard from '../ReviewCard/ReviewCard.js' ;
import Loader from '../Loader/Loader';

const ProductDetails = () => {

    const {productDetail,error,loading} = useSelector((state) => state.productDetail ) ;
    
    const dispatch = useDispatch() ;
    const { productId } = useParams();
    useEffect(()=>{
        dispatch(getProductDetails(productId));
    },[dispatch,productId])


  return (
    <Fragment > { loading ? <Loader></Loader> : (  <Fragment >
        <div className="carousel-wrapper" id='productDetails'>
        <div>
       <Carousel infiniteLoop useKeyboardArrows autoPlay>
     
        { productDetail.images && productDetail.images.map((item)=>{
           return   <div >
                 <img src={item.url} className='image'></img>
           </div>
       }) }
      
        </Carousel> 
        </div>
        <div>
        <div className='details-1' >
            <h2>{productDetail.name}</h2>
            <p>{productDetail._id}</p>
        </div>

        <div className='details-2' >
        <StarRatingComponent 
          name="rate2" 
          editing={false}
          renderStarIcon={() => <span>★</span>}
          starCount={5}
          value={productDetail.rating}
        />
        <span>{productDetail.noofreview} Reviews</span>
        </div>

        <div className='details-3'>
            <h1>₹ {productDetail.price}</h1>
        </div>

       <div className='details-4'>
       <div className='details-4-1'> 
            <button>-</button>
            <input type='number' min = '0'  ></input>
            <button>+</button>
        </div>
            <div className='details-4-2'>
                <button>Add to cart</button>
            </div>
       </div>

       <div className='details-5'>
        <h3>Status:  </h3>
            <p className={productDetail.stock > 1 ? "redColor" : "greenColor" } >{productDetail.stock > 1 ? " Out of stock" : " In stock" }</p>
       </div>

       <div className='details-6'>
        <h3>Description:</h3>
            <p >{productDetail.description }</p>
       </div>

       <div className='details-7'>
        <button>Submit Review</button>
       </div>
       </div>
        </div>
       <div className='reviewheading'><h2>Reviews</h2></div>
       { productDetail.reviews && productDetail.reviews[0] ? (
            <div className='reviews'>
                {
                ( productDetail.reviews &&   productDetail.reviews.map((item)=>{
                      return  <ReviewCard review = {item}></ReviewCard>
                    }))
                }
            </div>
       ) : ( 
       <div className='noreview'>
            <h3>No reviews yet</h3>
       </div> )
           
       }</Fragment>
       )}
    </Fragment>
  )
}

export default ProductDetails