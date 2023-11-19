import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './componenets/login';
import Client from './componenets/clientPage/client';
import { useEffect, useState } from 'react';
import Banker from './componenets/bankerPage/banker';
import ClientForm from './componenets/bankerPage/clientForm';
import Register from './componenets/register';
import ForgotPassword from './componenets/auth/forgotPassword';
import ResetPassword from './componenets/auth/resetPassword';

function App() {
  useEffect(() => {
    document.title = 'eBank Project'
  }, [])
  
  const isAuthenticated = localStorage.getItem('token') ? true : false;
  const PrivateRoute = ({ element, ...props }) => {
    return isAuthenticated ? (
      element
    ) : (
      <Navigate to="/login" replace state={{ from: props.location }} />
    );
  };

  const GuestRoute = ({ element, ...props }) => {
    console.log(isAuthenticated);
    return !isAuthenticated ? (
      element
    ) : (
      <Navigate to={localStorage.getItem('role') == 'CUSTOMER' ? '/client' : '/banker'} replace state={{ from: props.location }} />
    );
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GuestRoute element={<Login />} />} />

        <Route path="/login" element={<GuestRoute element={<Login />} />} />
        <Route path="/register" element={<GuestRoute element={<Register />} />} />
        <Route path="/login" element={<GuestRoute element={<Login />} />} />
        <Route path="/auth/forgotPassword" element={<GuestRoute element={<ForgotPassword />} />} />
        <Route path="/auth/resetPassword" element={<GuestRoute element={<ResetPassword />} />} />

        <Route path="/client" element={<PrivateRoute element={<Client />} />} />
        <Route path="/banker" element={<PrivateRoute element={<Banker />} />} />
        <Route path="/banker/clientForm" element={<PrivateRoute element={<ClientForm />} />} />

      </Routes>
    </BrowserRouter>

  );
}

export default App;
