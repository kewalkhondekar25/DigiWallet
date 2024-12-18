import { Router } from "express";
import { handleWebhook } from "../controllers/handleWebhook.controler";

const router = Router();

router.route("/").post(
  handleWebhook
);

export default router;