import { Router } from "express";
import { p2pTransfer } from "../controllers/p2pTransfer.controller";

const router = Router();

router.route("/p2p-transfer").post(
  p2pTransfer
);

export default router;