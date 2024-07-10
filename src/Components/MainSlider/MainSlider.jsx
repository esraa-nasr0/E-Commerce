import React from 'react';
import slider1 from'../../Assets/Img/slider-image-1.jpeg';
import slider2 from'../../Assets/Img/slider-image-2.jpeg';
import slider3 from'../../Assets/Img/slider-image-3.jpeg';
import blog1 from'../../Assets/Img/blog-img-1.jpeg';
import blog2 from'../../Assets/Img/blog-img-2.jpeg';
import Slider from "react-slick";

export default function MainSlider() {
    var settings = {
        dots: false,
        infinite: true,
        autoplay: true,
        speed: 2000,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows:false,
      };

    return <>
    <h1>MainSlider</h1>
    <div className="row gx-0">
        <div className="col-md-9">
        <Slider {...settings}>
          <img height={400} className='w-100' src={slider1} alt='slider1' />
          <img height={400} className='w-100' src={slider2} alt='slider2' />
          <img height={400} className='w-100' src={slider3} alt='slider3' />
        </Slider>
        </div>
        <div className="col-md-3">
        <img height={200} className='w-100' src={blog1} alt='blog1' />
        <img height={200} className='w-100' src={blog2} alt='blog2' />
        </div>
    </div>
    </>
}

