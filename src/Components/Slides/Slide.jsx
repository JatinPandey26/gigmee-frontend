import React from 'react'
import Slider from 'infinite-react-carousel';
import './Slide.scss'
import Card from '../CategoryCards/Card';

const Slide = ({ children, slidesToShow, arrowsScroll }) => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 6,
      slidesToSlide: 3 , // optional, default to 1.,,
      slidesToShow : 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
      slidesToSlide: 1, // optional, default to 1.
      slidesToShow : 3
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 3,
      slidesToSlide: 3,
      slidesToShow : 3 // optional, default to 1.
    }
  };
    return (
        <div className='slide'>
            <div className="container">
                <Slider slidesToShow = {4}  responsive={responsive} arrowsScroll={arrowsScroll}>
                    {children}
                </Slider>
            </div>
        </div>
    )
}

export default Slide