
import { useFormik } from 'formik';
import React, { useContext, useState } from 'react';
import style from'./Login.module.css';
import * as Yup from'yup';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import {ColorRing} from "react-loader-spinner";
import { UserContext } from '../../Context/UserContext';


export default function Login() {
    let {setUserToken , setuserData} = useContext(UserContext);
    let Navigate = useNavigate();
    const [error , seterror] = useState(null);
    const [isLoading, setisLoading] = useState(false);
   async function submitlogin(values) {
    setisLoading(true);
   let {data} =  await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values)
     .catch((err)=> {
        setisLoading(false);
        seterror(err.response.data.message)
     })

      if (data.message === 'success') {
        setisLoading(false);
        localStorage.setItem('userToken', data.token);
        setUserToken(data.token);
        setuserData(data.user);
        Navigate('/')
      }
    }

    
    
    let validation = Yup .object({
        
        email:Yup.string().email('email is invaled').required('email is required'),
       
        password: Yup.string()
        .required('No password provided.') 
        .min(8, 'Password is too short - should be 8 chars minimum.')
          .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
    })

    let formik = useFormik({
        initialValues:{

            email:'',
            password:'',

        },validationSchema:validation,
        onSubmit:submitlogin
    })

    return <>
    <div className={style.body}>
    <div className='w-50 m-auto my-5 shadow-lg p-5 rounded-5'>
    
        <h2>Login Now</h2>

        {error !==null ?<div className='alert mt-4 p-3 alert-info'>{error}</div>:''}

        <form  onSubmit={formik.handleSubmit} >

            <label htmlFor='email'>Email:</label>
            <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} id='email' className={style.input} type='email' name='email'/>
            {formik.errors.email && formik.touched.email? <div className='alert mt-4 p-3 alert-info'>{formik.errors.email}</div>:''}

            <label htmlFor='password'>Password:</label>
            <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} id='password' className={style.input} type='password' name='password'/>
            {formik.errors.password && formik.touched.password? <div className='alert mt-4 p-3 alert-info'>{formik.errors.password}</div>:''}

            
            {isLoading?  <button  type='button' className={style.button}>
            <ColorRing
              visible={true}
              height="40"
              width="80"
              ariaLabel="color-ring-loading"
              wrapperStyle={{}}
              wrapperClass="color-ring-wrapper"
              colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
             />
            </button>:<> 
            <div className='d-flex align-items-center'>
            <button disabled={!(formik.isValid && formik.dirty)} type='submit' className={style.button}>Login</button>
            <Link className='btn' to={'/register'}>Register New</Link>
            </div>
            </>
            
             }
            
           
        </form>
    </div>
    </div>
    </>
}