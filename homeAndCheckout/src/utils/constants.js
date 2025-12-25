import {object, string } from "yup";

export const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 2
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 2
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1 
    }
};

export const responsiveLike = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 4
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1 
    }
};

export const DELIVERY_TYPE = {
  PAY: "pay",
  FREE:"free"
}

export const CHECKOUT_DETAILS = {
  initialValue: {
    firstName: "",
    lastName: "",
    email: "",
    doorNo: "",
    landMark: "",
    pincode: "",
    number: ""
  },
  validationSchema: object().shape({
    email: string().required("Required").email("Invalid Email").nullable(),
    firstName: string().required("Required").nullable(),
    lastName: string().required("Required").nullable(),
    streetAddress: string().required("Required").nullable(),
    landMark: string().required("Required").nullable(),
    pincode: string()
    .required("Required")
    .matches(/^\d{6}$/, "Invalid Pincode")
    .nullable(),  
    number: string().required("Required").nullable(),
  }),
};

export const REGX_FORMET_AMOUNT = /\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g;

export const ENV_MODE = {
  DEVELOPMENT: "development",
  PRODUCTION: "production"
}