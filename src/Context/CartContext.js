import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let CartContext = createContext();

let userToken = localStorage.getItem('userToken');

let header = {
    token:userToken
}

function addToCart(id) {

   return axios.post(
        `https://ecommerce.routemisr.com/api/v1/cart`, {
        productId:id
    },{
        headers:header
    }).then((response)=> response)
    .catch((error)=> error)

}

function getLoggedUserCart() {
   return axios.get(`https://ecommerce.routemisr.com/api/v1/cart` , {
        headers:header
    }).then((response)=> response)
    .catch((error)=> error)
}

 function removeCartItem(productId) {
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
        headers:header
    }).then((response)=> response)
    .catch((error)=> error)
}

function updateProductQuantity(productId , count) {
    
    return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{count} ,{
        headers:header
    }).then((response)=> response)
    .catch((error)=> error)
}

function OnlonePayment(cartId , value) {
    return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,
        {
            shippingAddress:value
        }, {
           headers:header
    }).then((response)=> response)
    .catch((error)=> error);

}

export default function CartContextProvider(props) {
    
    const [cartId , setcartId] = useState(null);
    
    async function getCart() {
        let {data} = await getLoggedUserCart();
        setcartId (data?.data._id);
        console.log(data?.data._id);
    }

    useEffect(()=>{
        console.log('sesses');
        getCart()
    },[])
    
    return <CartContext.Provider value={{ cartId ,addToCart  , OnlonePayment , getLoggedUserCart , removeCartItem , updateProductQuantity}}>
        {props.children}
    </CartContext.Provider>



}