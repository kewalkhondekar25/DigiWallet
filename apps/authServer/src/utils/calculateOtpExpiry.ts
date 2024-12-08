import { getCurrentTime } from "./getCurrentTime"

export const isOtpExpire = (timeStamp: any) => {
  
  const currentTimeInMs = getCurrentTime();
  const expiryTimeInMs = new Date(timeStamp).getTime();
  
  return currentTimeInMs > expiryTimeInMs;
};