import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppRoutes from "./router/AppRoutes";
import { BrowserRouter } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";
import OfferBanner from "./components/OfferBanner";

export const toastErrorConfig = {
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
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <OfferBanner />
        <AppRoutes />
        <ToastContainer {...toastErrorConfig} />
      </BrowserRouter>
    </ErrorBoundary>
  );
};

export default App;
