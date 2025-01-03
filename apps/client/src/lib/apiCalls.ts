import { otpType, SignInType, SignUpType } from "@/types/auth.types";
import axiosInstance from "./axiosInstance"

const signInRequest = async (signInBody: SignInType): Promise<any> => {
  const response = await axiosInstance.post("/user/signin", signInBody);
  return response.data;
};

const signUpRequest = async (signUpBody: SignUpType) => {
  const response = await axiosInstance.post("/user/signup", signUpBody);
  return response.data;
};

const otpRequest = async (otpBody: otpType) => {
  const response = await axiosInstance.post("/user/verify-otp", otpBody);
  return response.data;
}

export {
  signInRequest,
  signUpRequest,
  otpRequest
};