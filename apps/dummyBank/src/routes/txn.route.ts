import { Router } from "express";
import { processOnRampTransaction } from "../controllers/processTxn.controller";

const router = Router();

router.route("/process-on-ramp-txn").post(
  processOnRampTransaction
);

export default router;