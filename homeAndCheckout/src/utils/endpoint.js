// const BASEURL = "https://kicks-backend-seven.vercel.app/"
const BASEURL = "http://localhost:4000/"

export const GET_HOME_DETAILS = BASEURL + `getHomeDetails`;
export const GET_PRODUCT_DETAILS = (id) => BASEURL + `getProductDetails?productId=${id}`;
export const GET_PRODUCT_LIST  = BASEURL + `getProductList`;
export const GET_FILTER_PROPERTIES  = BASEURL + `getFilterProperties`;