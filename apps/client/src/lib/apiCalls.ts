import { SignInType } from "@/types/auth.types";
import axiosInstance from "./axiosInstance"

const signInRequest = async (signInBody: SignInType): Promise<any> => {
  const response = await axiosInstance.post("/user/signin", signInBody);
  return response.data;
};

export {
  signInRequest
};