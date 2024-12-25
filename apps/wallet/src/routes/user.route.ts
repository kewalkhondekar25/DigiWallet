import { Router } from "express";
import { getP2pTransfers } from "../controllers/user.controller";

const router = Router();

router.route("/p2p-trnsfr").post(
  getP2pTransfers
);

export default router;