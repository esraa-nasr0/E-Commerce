import { jwtDecode } from 'jwt-decode';
import React, { useContext } from 'react';
import { UserContext } from '../../Context/UserContext';




export default function Profile() {

    let {userData} = useContext(UserContext)
    console.log(userData);
    

    return <>
    <h1>profil</h1>
    <h1>profil</h1>
    <h1>hello : {userData?.name}</h1>
    <h1>hello : {userData?.email}</h1>
    </>
}