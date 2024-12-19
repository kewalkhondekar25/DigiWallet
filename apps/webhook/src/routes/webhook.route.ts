import { Router } from "express";
import { handleOffRampTransaction, handleOnRampTransaction } from "../controllers/handleWebhook.controler";

const router = Router();

router.route("/on-ramp-txn").post(
  handleOnRampTransaction
);

router.route("/off-ramp-txn").post(
  handleOffRampTransaction
)

export default router;