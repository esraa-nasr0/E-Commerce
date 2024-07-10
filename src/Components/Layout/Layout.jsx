import React, { useContext, useEffect } from 'react';
import Navbar from '../Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';
import style from'./Layout.module.css';
import { Offline,  } from "react-detect-offline";

export default function Layout() {
    

  let {setUserToken} = useContext(UserContext)

  useEffect(()=>{
    if (localStorage.getItem('userToken')!== null)  {
      
      setUserToken(localStorage.getItem('userToken'))
    }
    
  },[]);

    return <>
    <Navbar/>
    <div className="container">
    <Outlet></Outlet>
    </div>
    <div >
{/* 
    <Online>
      <div className={style.network}>
        <i className="fas fa-wifi"></i > you're online
      </div>
    </Online> */}
    <Offline>
      <div className={style.network}>
        <i className="fas fa-wifi"></i > you're offline (surprise!)
      </div>
      </Offline>
    </div>
    {/* <Footer/> */}
    </>
}