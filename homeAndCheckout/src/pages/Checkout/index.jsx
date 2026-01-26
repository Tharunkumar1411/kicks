import { useState } from "react";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  OutlinedInput,
  Typography,
} from "@mui/material";
import styles from "./styles.module.scss";
import { Formik } from "formik";
import OrderSummaryCard from "../../components/OrderSummaryCard";
import { CHECKOUT_DETAILS, DELIVERY_TYPE } from "../../utils/constants";
import CustomButton from "../../components/CustomButton";
import useUserStore from "../../../../App/src/store/user";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../router/routes";

export default function Checkout() {
  const [deliveryType, setDeliveryType] = useState("pay");
  const { userDetails } = useUserStore((state) => state);
  const navigate = useNavigate();

  const handleDeliveryType = (type) => {
    setDeliveryType(type);
  };

  return (
    <div className={styles.rootContainer}>
      {!userDetails?.email && (
        <Typography
          onClick={() => navigate(ROUTES.LOGIN)}
          className={styles.label}
          style={{
            margin: "20px",
            textDecoration: "underline",
            cursor: "pointer",
          }}
        >
          Login and Checkout faster
        </Typography>
      )}

      <div className={styles.checkoutContainer}>
        <OrderSummaryCard />

        <div className={styles.shipRootContainer}>
          <div className={styles.contactContainer}>
            <Typography className={styles.header}>Contact Details</Typography>
            <Typography className={styles.label}>
              We will use these details to keep you inform about your delivery.
            </Typography>
            <OutlinedInput
              sx={{
                "& .MuiOutlinedInput-input": {
                  padding: "0",
                },
              }}
              type="email"
              className={styles.input}
              placeholder="Email *"
              name="email"
              inputProps={{
                maxLength: "26",
              }}
            />
          </div>

          <div className={styles.shippingContainer}>
            <Typography className={styles.header}>Shipping Address</Typography>
            <Formik
              initialValues={CHECKOUT_DETAILS.initialValue}
              validationSchema={CHECKOUT_DETAILS.validationSchema}
              // onSubmit={handleRegister}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleSubmit,
                setFieldValue,
                handleBlur,
              }) => (
                <form className={styles.form}>
                  <FormControl className={styles.handleStyle}>
                    <OutlinedInput
                      sx={{
                        "& .MuiOutlinedInput-input": {
                          padding: "0",
                        },
                      }}
                      autoComplete="off"
                      type="text"
                      className={styles.input}
                      placeholder="First Name *"
                      onInput={(e) => {
                        setFieldValue(
                          "firstName",
                          nameValidation(e?.target?.value),
                        );
                      }}
                      value={values.firstName}
                      name="firstName"
                      onBlur={handleBlur}
                      error={errors?.firstName && touched?.firstName}
                      inputProps={{
                        maxLength: "26",
                      }}
                    />
                    <OutlinedInput
                      sx={{
                        "& .MuiOutlinedInput-input": {
                          padding: "0",
                        },
                      }}
                      type="text"
                      className={styles.input}
                      placeholder="Last Name *"
                      onInput={(e) => {
                        setFieldValue(
                          "lastName",
                          nameValidation(e?.target?.value),
                        );
                      }}
                      value={values.lastName}
                      name="lastName"
                      onBlur={handleBlur}
                      error={errors?.lastName && touched?.lastName}
                      inputProps={{
                        maxLength: "26",
                      }}
                    />
                  </FormControl>

                  <OutlinedInput
                    sx={{
                      "& .MuiOutlinedInput-input": {
                        padding: "0",
                      },
                    }}
                    type="text"
                    className={styles.input}
                    placeholder="Flat No/Door No"
                    onInput={(e) => {
                      setFieldValue("doorNo", nameValidation(e?.target?.value));
                    }}
                    value={values.doorNo}
                    name="doorNo"
                    onBlur={handleBlur}
                    error={errors?.doorNo && touched?.doorNo}
                    inputProps={{
                      maxLength: "26",
                    }}
                  />
                  <OutlinedInput
                    sx={{
                      "& .MuiOutlinedInput-input": {
                        padding: "0",
                      },
                    }}
                    type="text"
                    className={styles.input}
                    placeholder="Land Mark"
                    onInput={(e) => {
                      setFieldValue(
                        "landMark",
                        nameValidation(e?.target?.value),
                      );
                    }}
                    value={values.doorNo}
                    name="landMark"
                    onBlur={handleBlur}
                    error={errors?.landMark && touched?.landMark}
                    inputProps={{
                      maxLength: "26",
                    }}
                  />
                  <FormControl className={styles.handleStyle}>
                    <OutlinedInput
                      sx={{
                        "& .MuiOutlinedInput-input": {
                          padding: "0",
                        },
                      }}
                      autoComplete="off"
                      type="text"
                      className={styles.input}
                      placeholder="Pincode *"
                      onInput={(e) => {
                        setFieldValue(
                          "pincode",
                          nameValidation(e?.target?.value),
                        );
                      }}
                      value={values.pincode}
                      name="pincode"
                      onBlur={handleBlur}
                      error={errors?.pincode && touched?.pincode}
                      inputProps={{
                        maxLength: "26",
                      }}
                    />
                    <OutlinedInput
                      sx={{
                        "& .MuiOutlinedInput-input": {
                          padding: "0",
                        },
                      }}
                      type="text"
                      className={styles.input}
                      placeholder="Phone Number *"
                      onInput={(e) => {
                        setFieldValue(
                          "number",
                          nameValidation(e?.target?.value),
                        );
                      }}
                      value={values.number}
                      name="number"
                      onBlur={handleBlur}
                      error={errors?.number && touched?.number}
                      inputProps={{
                        maxLength: "26",
                      }}
                    />
                  </FormControl>

                  <div className={styles.deliveryContainer}>
                    <Typography className={styles.header}>
                      Delivery Options
                    </Typography>
                    <div
                      style={
                        deliveryType === DELIVERY_TYPE.PAY
                          ? { backgroundColor: "#fff" }
                          : { backgroundColor: "transparent" }
                      }
                      className={styles.deliveryDetailsContainer}
                      onClick={() => handleDeliveryType(DELIVERY_TYPE.PAY)}
                    >
                      <div>
                        <Typography className={styles.header}>
                          Standard Delivery
                        </Typography>
                        <Typography className={styles.label}>
                          Enter your address to see when you’ll get your order
                        </Typography>
                      </div>
                      <Typography className={styles.amount}>$6.00</Typography>
                    </div>

                    <div
                      style={
                        deliveryType === DELIVERY_TYPE.FREE
                          ? { backgroundColor: "#fff" }
                          : { backgroundColor: "transparent" }
                      }
                      className={styles.deliveryDetailsContainer}
                      onClick={() => handleDeliveryType(DELIVERY_TYPE.FREE)}
                    >
                      <div>
                        <Typography className={styles.header}>
                          Collect in store
                        </Typography>
                        <Typography className={styles.label}>
                          Pay now, collect in store
                        </Typography>
                      </div>
                      <Typography className={styles.header}>Free</Typography>
                    </div>

                    <FormControlLabel
                      control={
                        <Checkbox
                          defaultChecked
                          sx={{
                            color: "#000",
                            "&.Mui-checked": {
                              color: "#000",
                            },
                          }}
                        />
                      }
                      label="My billing and delivery information are the same"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          defaultChecked
                          sx={{
                            color: "#000",
                            "&.Mui-checked": {
                              color: "#000",
                            },
                          }}
                        />
                      }
                      label="I’m 13+ year old"
                    />

                    <div>
                      <Typography
                        className={styles.header}
                        style={{ fontSize: "16px" }}
                      >
                        Also want product updates with our newsletter?
                      </Typography>
                      <FormControlLabel
                        className={styles.label}
                        control={
                          <Checkbox
                            defaultChecked
                            sx={{
                              color: "#000",
                              "&.Mui-checked": {
                                color: "#000",
                              },
                            }}
                          />
                        }
                        label="Yes, I’d like to receive emails about exclusive sales and more."
                      />
                    </div>
                  </div>

                  <CustomButton
                    children="REVIEW AND PAY"
                    sx={{
                      backgroundColor: "#000",
                      color: "#fff",
                      width: "100%",
                      marginTop: "10px",
                    }}
                  />
                </form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}
