import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './Layout';
import { ROUTES } from './routes';
import Loader from '../components/Loader';
import NotFound from '../pages/NotFound';

// Lazy load the pages
const RemoteHomeApp = React.lazy(() => import('home/HomeApp'));
const RemoteProductApp = React.lazy(() => import('home/ProductApp'));
const RemoteCartApp = React.lazy(() => import('home/CartApp'));
const RemoteCheckoutApp = React.lazy(() => import('home/CheckoutApp'));
const RemoteProductListApp = React.lazy(() => import('home/ProductListApp'));
const Register = React.lazy(() => import('../pages/Register'));
const Login = React.lazy(() => import('../pages/Login'));

const AppRoutes = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route element={<Layout />}>
          <Route path={ROUTES.HOME} element={<RemoteHomeApp />} />
          <Route path={ROUTES.PRODUCT} element={<RemoteProductApp />} />
          <Route path={ROUTES.CART} element={<RemoteCartApp />} />
          <Route path={ROUTES.CHECKOUT} element={<RemoteCheckoutApp />} />
          <Route path={ROUTES.LOGIN} element={<Login />} />
          <Route path={ROUTES.REGISTER} element={<Register />} />
          <Route path={ROUTES.PRODUCT_LIST} element={<RemoteProductListApp />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
