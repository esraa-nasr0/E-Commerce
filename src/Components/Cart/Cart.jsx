import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../Context/CartContext';
import style from'./Cart.module.css';
import {DNA} from "react-loader-spinner";
import { Link } from 'react-router-dom';

export default function Cart() {
    let {getLoggedUserCart , removeCartItem , updateProductQuantity} = useContext(CartContext);
    const[cartDetails , setCartDetails] = useState(null);


    async function updateCount(id , count) {
      let {data} = await   updateProductQuantity(id , count);
      setCartDetails(data);
    }


  async function removeItem(id) {
        let {data} = await removeCartItem(id);
        setCartDetails(data);
    }

  async function getCart() {
    let {data} = await getLoggedUserCart();
    console.log(data);
    setCartDetails(data);
    }


    useEffect(()=>{
        getCart();
    },[]);

    return <>
    
    <h1>cart</h1>
    {cartDetails?<div className="w-75 mx-auto my-5 shadow-lg p-5 rounded-5">
        <h3>Shopping Cart</h3>
        <h4 className='h6 text-primary fw-bolder'>Cart Items:{cartDetails.numOfCartItems}</h4>
        <h4 className='h6 text-primary fw-bolder mb-4'>Total Cart Price:{cartDetails.data.totalCartPrice} EGP</h4>
        {cartDetails.data.products.map((product)=> <div key={product.product.id} className='row border-bottom py-2 px-2 '>

            <div className="col-md-1">
                <img className='w-100' src={product.product.imageCover} alt='' />
            </div>
            <div className="col-md-11">
                <div className="d-flex justify-content-between align-items-center">

                  <div>
                    <h3 className="h6">{product.product.title.split(" ").slice(0,3).join('  ')}</h3>
                    <h6 className="text-primary"> Price :{product.price} EGP</h6>
                  </div>

                  <div>
                    <button onClick={()=> updateCount(product.product.id ,product.count + 1) } className={style.btn}> + </button>
                    <span className='mx-2'>{product.count}</span>
                    <button onClick={()=> updateCount(product.product.id ,product.count - 1) } className={style.btn}> - </button>

                  </div>
                </div>
                <button onClick={()=> removeItem(product.product.id) } className="btn p-0" > <i className='text-danger  fas fa-trash-can'></i>  Remove</button>
            </div>


        </div>)}

        <Link to={'/Address'} className='btn m-2 bg-primary text-white w-30 btn-sm mt-2 '>Online Payment</Link>
        <button className='btn m-2 bg-primary text-white w-30 btn-sm mt-2 '>Cash On Delivery</button>


    </div>:<section id='loading'  className='w-100 py-5 d-flex justify-content-center align-items-center'>
    <DNA
  visible={true}
  height="80"
  width="80"
  ariaLabel="dna-loading"
  wrapperStyle={{}}
  wrapperClass="dna-wrapper"/>
        </section>}
    

    
    </>
}