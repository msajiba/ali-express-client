import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { ToastContainer } from 'react-toastify';
import Header from './pages/Shared/Header';
import {Routes, Route} from 'react-router-dom';
import Home from './pages/Home/Home';
import ProductAdd from './pages/ProductAdd/ProductAdd';
import Login from './pages/Auth/Login';
import Order from './pages/Order/Order';
import Checkout from './pages/Checkout/Checkout';
import Register from './pages/Auth/Register';
import RequireAuth from './pages/Auth/RequireAuth';
import * as dotenv from 'dotenv';

function App() {
  


  return (
    <>
      <Header> </Header>

      <Routes>
          <Route path ='/' element={<Home />}> </Route>
          <Route path ='/home' element={<Home />}> </Route>
          <Route path ='/product-add' element={
              <RequireAuth>
                  <ProductAdd />
              </RequireAuth>
          }> </Route>
          <Route path ='/order' element={
            <RequireAuth>
                <Order> </Order>
            </RequireAuth>
          }> </Route>
          <Route path ='/checkout' element={<Checkout />}> </Route>
          <Route path ='/login' element={<Login />}> </Route>
          <Route path ='/register' element={<Register />}> </Route>
      </Routes>


      <ToastContainer />
    </>
  )
}

export default App
