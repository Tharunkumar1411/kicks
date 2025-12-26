import React from 'react';
import { ToastContainer, Slide } from 'react-toastify';
import AppRoutes from './router/AppRoutes';
import { BrowserRouter } from 'react-router-dom';

export const toastErrorConfig = {
  position: 'top-center',
  autoClose: 2000,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: 'colored',
  newestOnTop: false,
  rtl: false,
  pauseOnFocusLoss: true,
  transition: Slide,
  hideProgressBar: true,
};

const App = () => {
  return (
    <BrowserRouter>
      <AppRoutes />
      <ToastContainer {...toastErrorConfig} />
    </BrowserRouter>
  );
};

export default App;
