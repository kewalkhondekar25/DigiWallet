import { Router } from "express";
import { onRampTransactions } from "../controllers/onRampTxn.controller";

const router = Router();

router.route("/on-ramp-txn").post(
  onRampTransactions
);

export default router;