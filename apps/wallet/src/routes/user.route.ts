import { Router } from "express";
import { getP2pTransfers, getUsersData } from "../controllers/user.controller";

const router = Router();

router.route("/user-data").post(
  getUsersData
);

router.route("/p2p-trnsfr").post(
  getP2pTransfers
);

export default router;