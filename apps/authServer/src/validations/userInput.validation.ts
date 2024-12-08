import { z } from "zod";

const validateSignUpUsers = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long"),
  email: z.string().email('Invalid email address'),
  password: z.string().min(3, "Password must be at least 3 characters long")
});

const validateSignInUser = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(3, "Password must be at least 3 characters long")
});

const validateOtp = z.object({
  id: z.number().min(1),
  otp: z.string().min(6, "OTP must be 6 digit only")
});

const validateUserId = z.object({
  id: z.number().min(1)
});

export {
  validateSignUpUsers,
  validateSignInUser,
  validateOtp,
  validateUserId
};