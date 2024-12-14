import { prisma } from "@repo/db/client";
import apiErrorResponse from "../utils/apiErrorResponse";
import apiSuccessResponse from "../utils/apiSuccessResponse";
import asyncHandler from "../utils/asyncHandler";
import crypto from "crypto";

const onRampTransactions = asyncHandler( async (req, res) => {

  if(!process.env.SECRET_KEY){
    throw new apiErrorResponse(
      500,
      "No Secret key provided"
    )
  };
  
  const { id, amount }= req.body;

  const txnId = crypto.randomUUID();

  const payload = `${id}|${amount}|${txnId}`;
  const secureHash = crypto
  .createHmac("sha256", process.env.SECRET_KEY)
  .update(payload).digest("hex");

  const redirectUrl = `http://localhost:8083/api/v1/txn/process-on-ramp-txn?txnID=${txnId}&amount=${amount}&hash=${secureHash}`;

  await prisma.on_ramp_txn.create({
    data: {
      user_id: id,
      on_ramp_txn_id: txnId,
      amount,
      status: "PROCESSING"
    }
  });

  return res.status(200).json(
    new apiSuccessResponse(
      200,
      { txnId, redirectUrl},
      "Processing, Redirect to SBI Netbanking"
    )
  );
});

export { onRampTransactions };