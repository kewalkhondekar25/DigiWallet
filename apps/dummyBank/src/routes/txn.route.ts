import { Router } from "express";
import { processOffRampTransaction, processOnRampTransaction } from "../controllers/processTxn.controller";

const router = Router();

router.route("/process-on-ramp-txn").post(
  processOnRampTransaction
);

router.route("/process-off-ramp-txn").post(
  processOffRampTransaction
);

export default router;