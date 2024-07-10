import axios from 'axios'
import React from 'react'
import { useQuery } from 'react-query'
import Slider from "react-slick";


export default function CategorySlider() {
    var settings = {
        dots: false,
        infinite: true,
        autoplay: true,
        speed: 2000,
        slidesToShow: 7,
        slidesToScroll: 1
      };

    function getCategorys() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
    }

    let {isLoading , isError , data}= useQuery('CategorySlider', getCategorys)
    return <>
    <h1>CategorySlider</h1>
    <div className="py-4">
    {data?.data.data? <Slider {...settings}>
        {data?.data.data.map((Category)=> <img height={200} key={Category.id} className='w-100' src={Category.image} />)}
    </Slider>:''}
    </div>
    </>
}