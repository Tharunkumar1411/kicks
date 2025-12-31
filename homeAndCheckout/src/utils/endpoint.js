const BASEURL = "https://kicksms.vercel.app/";
// const BASEURL = "http://localhost:4000/";

export const HOME = {
  GET_HOME_DETAILS: BASEURL + `api/getHomeDetails`,
  GET_PRODUCT_DETAILS: (id) =>
    BASEURL + `api/getProductDetails?productId=${id}`,
  GET_PRODUCT_LIST: BASEURL + `api/getProductList`,
  GET_FILTER_PROPERTIES: BASEURL + `api/getFilterProperties`,
};

export const CART = {
  UPDATE_CART: BASEURL + `api/cart/update`,
};
