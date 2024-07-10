import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { UserContext } from '../../Context/UserContext';
import { useSelector } from 'react-redux';




export default function Navbar() {

let {counter} = useSelector((state)=> state.counter);


  // let {Counter} = useContext(CounterContext);
  let {userToken , setUserToken} = useContext(UserContext);
  let Navigate = useNavigate();

  function logout() {
    localStorage.removeItem('userToken');
    setUserToken(null);
    Navigate('/login')
    
  }

    return <>
    
    <nav class="navbar fixed-top navbar-expand-lg bg-light">
    <div className="container-fluid">
      <Link className="navbar-brand" to="/">
        Navbar
      </Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">

          {userToken !== null? <>
            <li className="nav-item">
            <Link className="nav-link active" aria-current="page" to="/">Home count {counter}</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link active" aria-current="page" to="Products">Products</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link active" aria-current="page" to="Brands">Brands</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link active" aria-current="page" to="Profile">Profile</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link active" aria-current="page" to="Cart">Cart</Link>
            </li> </>:""}
          
        </ul>
        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
          {userToken !== null?<>
            <li className="nav-item">
            <span onClick={()=> logout()} className="nav-link cursor-pointer">Logout</span>
          </li>
          </>:<>
          <li className="nav-item">
            <Link className="nav-link active" aria-current="page" to="Login">Login</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link active" aria-current="page" to="Register">Register</Link>
          </li>
          </> }

        </ul>
      </div>
    </div>
  </nav>
    </>
}
