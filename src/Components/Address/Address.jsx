import { useFormik } from 'formik';
import React, { useContext } from 'react';
import style from'./Address.module.css';
import { CartContext } from '../../Context/CartContext';



export default function Address() {

    let {OnlonePayment , cartId} = useContext(CartContext);

   async function handleAddressSubmit(value) {
    let response = await OnlonePayment( cartId  , value );
        console.log(response?.data.session.url);
        window.location.href = response?.data.session.url;
    }

    let formik = useFormik({
        initialValues:{
            details:'',
            phone:'',
            city:'',
        },onSubmit : handleAddressSubmit
    })

    return <>
    <div className={style.body}>
        
    <div className='w-50 m-auto my-5 shadow-lg p-5 rounded-5'>
        <div className="container">
            <form onSubmit={formik.handleSubmit}>

               <label htmlFor='details'> Details : </label>
               <input value={formik.values.details} onChange={formik.handleChange} onBlur={formik.handleBlur} type='text' className={style.input} name='details' id='details'/>
              
               <label htmlFor='phone'> Phone : </label>
               <input value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} type='tel' className={style.input} name='phone' id='phone'/>
               
               <label htmlFor='city'> City : </label>
               <input value={formik.values.city} onChange={formik.handleChange} onBlur={formik.handleBlur} type='text' className={style.input} name='city' id='city'/>
               
               <button type='submit'  className='btn m-2 bg-primary text-white w-30 btn-sm mt-2'>Pay Now</button>
            
            </form>
            
        </div>
    </div>

    </div>
    </>
}