import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
 import {DNA} from "react-loader-spinner";
import { Link } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';


 export default function FeaturedProducts() {

  let {addToCart} = useContext(CartContext);

    async function addProductToCart(id) {

     let response= await addToCart(id);
     if (response.data.status === "success")
      {
        toast.success('Product Successfully Added')
     }
     else
     {
       toast.error('Error Addeing Product')
     }
     console.log(response);
    }

    function getFeaturedProduct() {

        return axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
        
    }

    let {isLoading , isError , data , isFetching , } = useQuery('featuredproduct', getFeaturedProduct, {
       cacheTime:3000,
       refetchInterval:5000,
      // staleTime:3000,
      // refetchOnMount:false,
      //enabled:false,

    });
    console.log('isLoading' , isLoading);
    console.log('isFetching' , isFetching);


//     const[products , setproducts] = useState([]);
//     const[loading , setloading] = useState(false);

//    async function getFeatured() {
//         setloading(true);
//         let {data}= await  axios.get('https://ecommerce.routemisr.com/api/v1/products');
//         setproducts(data.data);
//         setloading(false);
//     }
//     useEffect(()=>{

//         getFeatured();
//     },[])

    return <>
    {isLoading?
    <div className='w-100 py-5 d-flex justify-content-center'>
    <DNA
  visible={true}
  height="80"
  width="80"
  ariaLabel="dna-loading"
  wrapperStyle={{}}
  wrapperClass="dna-wrapper"
  /></div>:
  
  <div className="container py-2">
    <h1>GET PRODUCTS</h1>
    {/* <button onClick={()=> refetch()} className='btn bg-primary text-white w-100'> GET PRODUCTS</button> */}
      <div className="row">
          {data?.data.data.map((product)=> <div key={product.id} className='col-md-2'>
            <Link to={`/ProductDetails/${product.id}`}>
            <div className="product cursor-pointer py-3 px-2">
              <img className='w-100' src={product.imageCover} alt={product.title} />
              <span className='text-primary font-sm fw-bolder'>{product.category.name}</span>
              <h3 className='h6'>{product.title.split(" ").slice(0,2).join('  ')}</h3>
              <div className='d-flex justify-content-between mt-2'>
                  <span>{product.price}EGP</span>

                  <span> <i className='fas fa-star text-warning'></i> {product.ratingsAverage} </span>
              </div>
              
            </div>
            </Link>
            <button onClick={()=> addProductToCart(product.id)} className='btn bg-primary text-white w-100 btn-sm mt-2'>Add to Card</button>
          </div>)}
      </div>
  </div>}
    
    </>
}
