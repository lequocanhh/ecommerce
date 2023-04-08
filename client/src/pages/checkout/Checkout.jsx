import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Box, Button, Step, StepLabel, Stepper } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import Shipping from "./Shipping";
import { shades } from "../../theme";
import Payment from "./Payment";
import { loadStripe, loasdStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51MuE26CsYV3MrChxMMc2ZQU911FGPrz7PABe6nXyxqA5rVwhGLhiqmBCWiUYkCJyjQAHxrPZbOhvCYHLojtRWETc00EjnUwpn1"
);

const initialValues = {
  billingAddress: {
    firstName: "",
    lastName: "",
    country: "",
    city: "",
    district: "",
    ward: "",
    specificAddress: "",
    zipCode: "",
  },
  shippingAddress: {
    isSameAddress: true,
    firstName: "",
    lastName: "",
    country: "",
    city: "",
    district: "",
    ward: "",
    specificAddress: "",
    zipCode: "",
  },
  email: "",
  phoneNumber: "",
};

const checkoutSchema = [
  yup.object().shape({
    billingAddress: yup.object().shape({
      firstName: yup.string().required("First name is required"),
      lastName: yup.string().required("Last name is required"),
      country: yup.string().required("Select country"),
      city: yup.string().required("Select city"),
      district: yup.string().required("Select district"),
      ward: yup.string().required("Select ward"),
      specificAddress: yup.string().required("Specific address is required"),
      zipCode: yup.string().required("Zip code can't be empty"),
    }),
    shippingAddress: yup.object().shape({
      isSameAddress: yup.boolean(),
      firstName: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("First name is required"),
      }),
      lastName: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("Last name is required"),
      }),
      country: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("Select country"),
      }),
      city: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("Select city"),
      }),
      district: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("Select district"),
      }),
      ward: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("Select ward"),
      }),
      specificAddress: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("Specific address is required"),
      }),
      zipCode: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("Zip code can't be empty"),
      }),
    }),
  }),
  yup.object().shape({
    email: yup
      .string()
      .required("Email is required")
      .matches(
        /[^\s@]+@[^\s@]+\.[^\s@]+/,
        "Please enter a valid email address"
      ),
    phoneNumber: yup.string().required("Phone number can't be empty"),
  }),
];

const Checkout = () => {
  const [activeStep, setActiveStep] = useState(0);
  const cart = useSelector((state) => state.cart.cart);
  const isFirstStep = activeStep === 0;
  const isSecondStep = activeStep === 1;

  const handleFormSubmit = async (values, actions) => {
    setActiveStep(activeStep + 1);

    //copy billing address to shipping address
    if (isFirstStep && values.shippingAddress.isSameAddress) {
      actions.setFieldValue("shippingAddress", {
        ...values.billingAddress,
        isSameAddress: true,
      });
    }
    if (isSecondStep) {
      makePayment(values);
    }
    actions.setTouched({});
  };

  async function makePayment(values) {
    const stripe = await stripePromise;
    const requestBody = {
      userName: [
        values.billingAddress.firstName,
        values.billingAddress.lastName,
      ].join(" "),
      email: values.email,
      products: cart.map(({ id, count }) => ({
        id,
        count,
      })),
    };

    const response = await fetch("http://localhost:1337/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });
    const session = await response.json();
    await stripe.redirectToCheckout({
      sessionId: session.id,
    });
  }

  return (
    <Box width="80%" m="100px auto">
      <Stepper activeStep={activeStep} sx={{ m: "20px 0" }}>
        <Step>
          <StepLabel>Billing</StepLabel>
        </Step>
        <Step>
          <StepLabel>Payment</StepLabel>
        </Step>
      </Stepper>
      <Box>
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
          validationSchema={checkoutSchema[activeStep]}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            setFieldValue,
          }) => (
            <form onSubmit={handleSubmit}>
              {isFirstStep && (
                <Shipping
                  values={values}
                  errors={errors}
                  touched={touched}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  setFieldValue={setFieldValue}
                />
              )}
              {isSecondStep && (
                <Payment
                  values={values}
                  errors={errors}
                  touched={touched}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  setFieldValue={setFieldValue}
                />
              )}
              <Box display="flex" justifyContent="space-between" gap="50px">
                {!isFirstStep && (
                  <Button
                    fullWidth
                    color="primary"
                    variant="contained"
                    sx={{
                      backgroundColor: shades.primary[200],
                      boxShadow: "none",
                      color: "white",
                      borderRadius: 0,
                      padding: "15px 40px",
                    }}
                    onClick={() => setActiveStep(activeStep - 1)}
                  >
                    Back
                  </Button>
                )}
                <Button
                  fullWidth
                  type="submit"
                  color="primary"
                  variant="contained"
                  sx={{
                    backgroundColor: shades.primary[400],
                    boxShadow: "none",
                    color: "white",
                    borderRadius: 0,
                    padding: "15px 40px",
                  }}
                >
                  {!isSecondStep ? "Next" : "Place Order"}
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default Checkout;
