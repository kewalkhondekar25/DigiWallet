import { z } from "zod";

const validateSignUpUsers = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long"),
  email: z.string().email('Invalid email address'),
  password: z.string().min(3, "Password must be at least 3 characters long")
});

export {
  validateSignUpUsers
};