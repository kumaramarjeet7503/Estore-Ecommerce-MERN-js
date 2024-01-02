import React from 'react'
import { Link } from 'react-router-dom'


const Product = ({product}) => {
  return (
    <Link className='productCard' to={product._id} >
        <img src={product.images[0].url} alt={product.name}></img>
        <p>{product.name}</p>
        <div>
          <span>(256 Reviews)</span>
        </div>
        <span>{"₹"+product.price}</span>
    </Link>
  )
}

export default Product