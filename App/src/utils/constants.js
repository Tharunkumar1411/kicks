import {object, ref, string } from "yup";

export const NavItems = ["New Drops 🔥", "Men", "Women"]

export const KEYCHAIN = "kicks_key"

export const GENDERS = [
  {
    value: "Male",
    label: "Male",
  },
  {
    value: "Female",
    label: "Female",
  },
  {
    value: "Other",
    label: "Other",
  },
];

export const allowAlphabets = (value = "") => {
    return value?.replace(/[^a-zA-Z]/gi, "");
};

export const LOGIN_DETAILS = {
  initialValue: {
    email: "",
    password: ""
  },
  validationSchema: object().shape({
    email: string().required("Required").email("Invalid Email").nullable(),
    password: string()
    .required("Required")
    .nullable(),
  }),
};

export const REGISTER_DETAILS = {
    initialValue: {
      firstName: "",
      lastName: "",
      email: "",
      gender: "Male",
      password: "",
      confirmPassword: ""
    },
    validationSchema: object().shape({
      email: string().required("Required").email("Invalid Email").nullable(),
      firstName: string().required("Required").nullable(),
      lastName: string().required("Required").nullable(),
      gender: string().required("Required").nullable(),
      password: string()
      .required("Required")
      .matches( /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@_!#$%^&*()<>?/|}{~:])[A-Za-z\d@_!#$%^&*()<>?/|}{~:]{8,}$/, "Invalid Password")
      .nullable(),
      confirmPassword: string().required("Required").oneOf(
        [ref("password")],
        'Must match the "New Password" field value'
      ),
    }),
};

export const validationRules = [
  { text: "Minimum 8 characters", regex: /.{8,}/ },
  { text: "At least one uppercase letter (A-Z)", regex: /[A-Z]/ },
  { text: "At least one lowercase letter (a-z)", regex: /[a-z]/ },
  { text: "At least one number (0-9)", regex: /[0-9]/ },
  {
    text: "At least one special character (e.g., @, #, $, / etc.)",
    regex: /[@_!#$%^&*()<>?/|]/,
  },
];

export const ENV_MODE = {
  DEVELOPMENT: "development",
  PRODUCTION: "production"
}