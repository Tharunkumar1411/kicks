export const BASEURL = `https://kicksms.vercel.app/`;
// export const BASEURL = "http://localhost:4000/";

export const AUTH = {
  REGISTER_USER: BASEURL + `api/create/user`,
};

export const USER = {
  GET_USER_DETAILS: (userId) => BASEURL + `api/getUserDetails?userId=${userId}`,
};
