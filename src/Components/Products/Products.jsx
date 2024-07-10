import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { decrease, increase } from "../../Redux/CounterSlice";





export default function Products(props) {

    let {counter} = useSelector((state)=> state.counter);
    let dispatch = useDispatch();

    return <>
    <h1>product</h1>
    <h1>product</h1>
    <h1>product</h1>
    <h1>count : {counter}</h1>
    <button onClick={()=> dispatch(increase()) } className="btn bg-primary text-white">increase</button>
    <button onClick={()=> dispatch(decrease()) } className="btn bg-primary text-white">decrease</button>
    </>
}