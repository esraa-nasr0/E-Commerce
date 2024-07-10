import axios from "axios";
import React, { useEffect, useState } from "react"
import { Helmet } from "react-helmet";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom"
import Slider from "react-slick";

export default function ProductDetails() {
    var settings = {
        dots: false,
        infinite: true,
        autoplay: true,
        speed: 2000,
        slidesToShow: 1,
        slidesToScroll: 1
      };

    let Params = useParams();
    function getProductDetails(id) {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
    }

    let {isLoading , isError , data } = useQuery('ProductDetails' ,()=> getProductDetails(Params.id) )
    console.log(data?.data.data);




//     const[ProductDetails , setProductDetails]= useState(null);
//     console.log(Params.id);

//    async function getProductDetails(id) {

//     let {data} =  await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);

//     setProductDetails(data)

//     }

//     useEffect(()=>{

//         getProductDetails(Params.id)

//     },[])

    return <>
    <h1>ProductDetails</h1>
    {data?.data.data?<div className="row py-2 align-items-center">
            <Helmet>
                <meta name="description" content=""/>
                <title> {data?.data.data.title}</title>
                
            </Helmet>
        <div className="col-md-4">
           
    <Slider {...settings}>
        {data?.data.data.images.map((img)=> <img alt={data?.data.data.title} src={img} className="w-100" />)}
    </Slider>
  
        </div>
        <div className="col-md-8">
            <h1 className="h5">{data?.data.data.title}</h1>
            <p>{data?.data.data.description}</p>
            <h6 className="text-primary">{data?.data.data.category?.name}</h6>
            <h6 className="text-primary">Price: {data?.data.data.price} EGP</h6>
            <div className="d-flex justify-content-between">
               <span>ratingsQuantity:{data?.data.data.ratingsQuantity}</span>

               <span> <i className='fas fa-star text-warning'></i> {data?.data.data.ratingsAverage} </span>
            </div>

            <button className='btn bg-primary text-white w-100 btn-sm mt-2'>Add to Card</button>

        </div>
         </div>:''}
    </>
}