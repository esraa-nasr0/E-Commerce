import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBrand } from '../../Redux/BrandSlice';
import { DNA } from 'react-loader-spinner';
import style from'./Brands.module.css';


export default function Brands() {

    let {loading , isError , brand} = useSelector((state)=> state.brand);
    let dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getBrand())
    },[])

    return<>
    <h1>brand</h1>
    <h1>brand</h1>
    {loading? <div className={style.loading}> 
        <DNA
        visible={true}
        height="80"
        width="80"
        ariaLabel="dna-loading"
        wrapperStyle={{}}
        wrapperClass="dna-wrapper"
  /></div>: <div className='row'>
    {brand.map((brands)=>
    <div className="col-md-2">
    <div>
        <img className='w-100' src={brands.image} alt=''/>
        <h4 className='h6 my-2'>{brands.name}</h4>
    </div>
    </div>)}
    </div>}
    </>
}