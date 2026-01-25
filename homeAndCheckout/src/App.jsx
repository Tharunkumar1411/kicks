import React, { Suspense } from "react";
import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./index.css";
import { Route, Routes } from "react-router-dom";
import Loader from "./components/Loader";
import ErrorBoundary from "./components/ErrorBoundary";

const Home = React.lazy(() => import("./pages/Home"));
const Product = React.lazy(() => import("./pages/Product"));
const Cart = React.lazy(() => import("./pages/Cart"));
const Checkout = React.lazy(() => import("./pages/Checkout"));
const ProductList = React.lazy(() => import("./pages/ProductList"));

export const toastConfig = {
  position: "top-center",
  autoClose: 3000,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: "colored",
  newestOnTop: false,
  rtl: false,
  pauseOnFocusLoss: true,
  transition: Slide,
  hideProgressBar: false,
};

const App = () => {
  return(
    <ErrorBoundary>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/product/:id" element={<Product />}/>
          <Route path="/cart/:id" element={<Cart />}/>
          <Route path="/checkout/:id" element={<Checkout />}/>
          <Route path="/product-list" element={<ProductList />}/>
        </Routes>
      </Suspense>
      <ToastContainer {...toastConfig} />
    </ErrorBoundary>
  )
}

export default App;
