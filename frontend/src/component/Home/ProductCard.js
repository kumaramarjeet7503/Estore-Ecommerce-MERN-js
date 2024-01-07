import React from 'react'
import { Link } from 'react-router-dom'
import StarRatingComponent from 'react-star-rating-component';


const Product = ({product}) => {
  return (
    <Link className='productCard' to = {`/product/${product._id}`} >
        <img src={product.images[0].url} alt={product.name}></img>
        <p>{product.name}</p>
        <div>
        <StarRatingComponent 
          name="rate2" 
          editing={false}
          renderStarIcon={() => <span>★</span>}
          starCount={5}
          value={product.rating}
        />
          <span>{product.noofreview}</span>
        </div>
        <span>{"₹"+product.price}</span>
    </Link>
  )
}

export default Product