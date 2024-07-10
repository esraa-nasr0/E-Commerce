
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import  { Toaster } from 'react-hot-toast';
import Layout from './Components/Layout/Layout';
import Home from './Components/Home/Home';
import Products from './Components/Products/Products';
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';
import Cart from './Components/Cart/Cart';
import Notfound from './Components/Notfound/Notfound';
import ContextProvider from './Context/UserContext';
import CounterContextProvider from './Context/CounterContext';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import CartContextProvider from './Context/CartContext';
import Profile from './Components/Profile/Profile';
import { Provider } from 'react-redux';
import { store } from './Redux/Store';
import Brands from './Components/Brands/Brands';
import Address from './Components/Address/Address';
import Orders from './Components/Orders/Orders';





let router = createBrowserRouter([
  {path:'/' , element:<Layout/> , children:[
    {index:true , element:<ProtectedRoute><Home/></ProtectedRoute>},
    {path:'Products', element:<ProtectedRoute><Products/></ProtectedRoute>},
    {path:'Brands', element:<ProtectedRoute><Brands/></ProtectedRoute>},
    {path:'Profile', element:<ProtectedRoute><Profile/></ProtectedRoute>},
    {path:'Cart', element:<ProtectedRoute><Cart/></ProtectedRoute>},
    {path:'Address', element:<ProtectedRoute><Address/></ProtectedRoute>},
    {path:'allorders', element:<ProtectedRoute><Orders/></ProtectedRoute>},

    {path:'ProductDetails/:id', element:<ProtectedRoute><ProductDetails/></ProtectedRoute>},
    {path:'Login', element:<Login/>},
    {path:'Register', element:<Register/>},
    {path:'*', element:<Notfound/>},
  ]}
])

export default function App() {

  return<> 
  <CartContextProvider>
  <ContextProvider>
   <CounterContextProvider>

    <Provider store={store}>
    <RouterProvider router={router}></RouterProvider>
     <Toaster/>
    </Provider>
   
   </CounterContextProvider>
  </ContextProvider>
 
  </CartContextProvider>
  </>
}

 
