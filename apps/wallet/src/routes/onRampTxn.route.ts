import { Router } from "express";
import { onRampTransactions } from "../controllers/onRampTxn.controller";
import { offRampTransactions } from "../controllers/offRampTxn.controller";

const router = Router();

router.route("/on-ramp-txn").post(
  onRampTransactions
);

router.route("/off-ramp-txn").post(
  offRampTransactions
);

export default router;