import { otpType, SignInType, SignUpType, userIdType } from "@/types/auth.types";
import axiosInstance from "./axiosInstance"
import axios from "axios";

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
};

const fetchUserData = async (userId: userIdType) => {
  const response = await axios.post("http://localhost:8082/api/v1/user/user-data", userId);
  return response.data;
}

export {
  signInRequest,
  signUpRequest,
  otpRequest,
  fetchUserData
};