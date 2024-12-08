const generateOtp = () => {
  const otp = String(Math.floor(100000 + Math.random() * 900000));
  console.log("OTP: ", otp);
  return otp;
};

const expireOtp = () => {
  const currentTimeInMs = Date.now();
  const expiryTimeInMs = currentTimeInMs + 15 * 60 * 1000;
  return new Date(expiryTimeInMs)
}

export {
  generateOtp,
  expireOtp
}