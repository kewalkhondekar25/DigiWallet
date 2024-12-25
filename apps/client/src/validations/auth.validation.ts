import * as yup from "yup"

const signUpValidation = () => {
  return yup.object({
    name: yup.string().required("Name is required").min(3, "Name must be at least 3 characters"),
    email: yup.string().email("Invalid Email").required("Email is required"),
    password: yup.string().required("Password is required").min(3, "Password must be at least 3 characters")
  });
};

const signInValidation = () => {
  return yup.object({
    email: yup.string().email("Invalid Email").required("Email is required"),
    password: yup.string().required("Password is required")
  });
};

const otpValidation = () => {
  return yup.object({
    otp: yup.string().required().length(6, "OTP must be 6 digits").matches(/^\d{6}$/, 'OTP must contain only numbers')
  });
};

export {
  signUpValidation,
  signInValidation,
  otpValidation
};