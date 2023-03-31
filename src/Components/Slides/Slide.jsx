import React from 'react'
import Slider from 'infinite-react-carousel';
import './Slide.scss'
import Card from '../CategoryCards/Card';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export const SwiperSlider = ({ children }) => {
  return (
    <Swiper
      className='sliderSwiper'
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={50}
      slidesPerView={3}
      navigation
      pagination={{ clickable: true }}
      
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log('slide change')}
      breakpoints={{
        0: {
          slidesPerView: 1,
        },
        580:{
          slidesPerView:2,
        },
        
        1250:{
          slidesPerView:3
        },
        
        1550:{
          slidesPerView:4
        },
        1800:{
          slidesPerView:5
        }
      }}
    >
      {children}
    </Swiper>
  )
}

const Slide = ({ children, slidesToShow, arrowsScroll }) => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 6,
      slidesToSlide: 3, // optional, default to 1.,,
      slidesToShow: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
      slidesToSlide: 1, // optional, default to 1.
      slidesToShow: 3
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 3,
      slidesToSlide: 3,
      slidesToShow: 3 // optional, default to 1.
    }
  };
  return (
    <div className='slide'>
      <div className="container">
        <Slider slidesToShow={slidesToShow} responsive={responsive} arrowsScroll={arrowsScroll}>
          {children}
        </Slider>
      </div>
    </div>
  )
}

export default Slide