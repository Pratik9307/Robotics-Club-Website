import React from 'react';
import './Card.css'; // For styling
import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';

const Card = ({ image, title, Disc, price, isLoggedIn }) => {
  const [readmore, setReadmore] = useState(false);
  const navigate = useNavigate(); // Used to programmatically navigate

  const description = readmore ? Disc : `${Disc.substring(0, 200)}....`;

  const readmoreHandler = () => {
    setReadmore(!readmore);
  };

  // Function to handle "Apply" button click
  const handleApplyClick = () => {
    if (!isLoggedIn) {
      // If the user is not logged in, redirect to the Register page
      navigate('/signup');
    } else {
      // If the user is logged in, you can navigate to a different route (e.g., a course detail or confirmation page)
      navigate('/Course'); // Change this to the appropriate route
    }
  };

  return (
    <div className='Card-Wrapper'>
      <div className='card-image'>
        <img src={image} alt={title} />
      </div>
      <div className='card-content'>
        <h2 className='card-title'>{title}</h2>
      </div>
      <div className='card-description'>
        {description}
        <span className="read-more" onClick={readmoreHandler}>
          {readmore ? 'Show Less' : 'Read More'}
        </span>
      </div>
      <div className='card-footer'>
        <span className='instructor'>Price</span>
        <span className='price'>{price}</span>
      </div>
      <div className='rating'>
        <span>⭐⭐⭐⭐⭐</span>
      </div>
      <button className='btn-card' onClick={handleApplyClick}>
        Apply
      </button>
    </div>
  );
};

export default Card;
