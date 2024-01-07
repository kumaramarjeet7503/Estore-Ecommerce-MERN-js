import React from 'react'
import StarRatingComponent from 'react-star-rating-component';
import profile from '../../public/images/user.jpeg'

const ReviewCard = ({review}) => {
  return (
    <div className='reviewcard' >
        <img src={profile} ></img>
        <StarRatingComponent 
          name="reviewstart" 
          editing={false}
          renderStarIcon={() => <span>★</span>}
          starCount={5}
          value={review.rating}
        />
        <h3>{review.name}</h3>
        <p>{review.comments}</p>
    </div>
  )
}

export default ReviewCard