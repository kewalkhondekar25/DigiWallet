import { Router } from "express";
import { resendOtp, signUpUser, verifyOtp } from "../controllers/user.controller";
import handleValidations from "../middlewares/handleValidations.middleware";
import { validateSignUpUsers, validateOtp, validateUserId } from "../validations/userInput.validation";

const router = Router();

router.route("/signup").post(
  handleValidations(validateSignUpUsers),
  signUpUser
);

router.route("/verify-otp").post(
  handleValidations(validateOtp),
  verifyOtp
);

router.route("/resend-otp").post(
  handleValidations(validateUserId),
  resendOtp
);

export default router;