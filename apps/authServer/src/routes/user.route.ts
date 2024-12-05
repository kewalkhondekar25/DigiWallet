import { Router } from "express";
import { signUpUser } from "../controllers/user.controller";
import handleValidations from "../middlewares/handleValidations.middleware";
import { validateSignUpUsers } from "../validations/userInput.validation";

const router = Router();

router.route("/signup").post(
  handleValidations(validateSignUpUsers),
  signUpUser
);

export default router;