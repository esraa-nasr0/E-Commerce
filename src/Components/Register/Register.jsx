
import { useFormik } from 'formik';
import React, { useState } from 'react';
import style from'./Register.module.css';
import * as Yup from'yup';
import axios from 'axios';
import {  Navigate, useNavigate } from 'react-router-dom';
import {ColorRing} from "react-loader-spinner";


export default function Register() {

    let Navigate = useNavigate();
    const [error , seterror] = useState(null);
    const [isLoading, setisLoading] = useState(false);
   async function submitregister(values) {
    setisLoading(true);
   let {data} =  await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values).catch((err)=> {
        setisLoading(false);
        seterror(err.response.data.message)
     })
      if (data.message === 'success') {
        setisLoading(false);
        Navigate('/Login')
      }
    }

    let phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
    
    let validation = Yup .object({
        name:Yup.string().min(3,'name minlength is 3').max(10,'name maxlength is 3').required('name is required'),
        email:Yup.string().email('email is invaled').required('email is required'),
        phone: Yup.string().matches(phoneRegExp, 'Phone number is not valid').required('phone is required'),
        password: Yup.string()
        .required('No password provided.') 
        .min(8, 'Password is too short - should be 8 chars minimum.')
          .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
        rePassword:Yup.string()
        .oneOf([Yup.ref("password",' password and rePassword dont match ')])
        .required('password is required'),
    })

    let formik = useFormik({
        initialValues:{
            name:'',
            email:'',
            phone:'',
            password:'',
            rePassword:'',
        },validationSchema:validation,
        onSubmit:submitregister
    })

    return <>
    <div className={style.body}>
    <div className='w-50 m-auto my-5 shadow-lg p-5 rounded-5'>
    
        <h2>Register Now</h2>

        {error !==null ?<div className='alert mt-4 p-3 alert-info'>{error}</div>:''}

        <form  onSubmit={formik.handleSubmit} >
            <label htmlFor='name'>Name:</label>
            <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.name} id='name' className={style.input} type='text' name='name'/>
            {formik.errors.name && formik.touched.name? <div className='alert mt-4 p-3 alert-info'>{formik.errors.name}</div>:''}

            <label htmlFor='email'>Email:</label>
            <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} id='email' className={style.input} type='email' name='email'/>
            {formik.errors.email && formik.touched.email? <div className='alert mt-4 p-3 alert-info'>{formik.errors.email}</div>:''}

            <label htmlFor='phone'>Phone:</label>
            <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phone} id='phone' className={style.input} type='tel' name='phone'/>
            {formik.errors.phone && formik.touched.phone? <div className='alert mt-4 p-3 alert-info'>{formik.errors.phone}</div>:''}

            <label htmlFor='password'>Password:</label>
            <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} id='password' className={style.input} type='password' name='password'/>
            {formik.errors.password && formik.touched.password? <div className='alert mt-4 p-3 alert-info'>{formik.errors.password}</div>:''}

            <label htmlFor='rePassword'>rePassword:</label>
            <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.rePassword} id='rePassword' className={style.input} type='password' name='rePassword'/>
            {formik.errors.rePassword && formik.touched.rePassword? <div className='alert mt-4 p-3 alert-info'>{formik.errors.rePassword}</div>:''}
            
            {isLoading?  <button  type='button' className={style.button}>
            <ColorRing
              visible={true}
              height="80"
              width="80"
              ariaLabel="color-ring-loading"
              wrapperStyle={{}}
              wrapperClass="color-ring-wrapper"
              colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
  />
            </button>:
            <button disabled={!(formik.isValid && formik.dirty)} type='submit' className={style.button}>Register</button>
             }
            
           
        </form>
    </div>
    </div>
    </>
}