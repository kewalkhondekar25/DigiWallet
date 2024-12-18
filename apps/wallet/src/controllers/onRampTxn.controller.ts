import { prisma } from "@repo/db/client";
import apiErrorResponse from "../utils/apiErrorResponse";
import apiSuccessResponse from "../utils/apiSuccessResponse";
import asyncHandler from "../utils/asyncHandler";
import crypto from "crypto";
import { generateToken } from "../services/generateToken";

const onRampTransactions = asyncHandler( async (req, res) => {

  if(!process.env.SECRET_KEY){
    throw new apiErrorResponse(
      500,
      "No Secret key provided!!!"
    )
  };
  
  const { id, amount }= req.body;

  const txnId = crypto.randomUUID();

  const payload = { id, amount, txnId };
  
  const token = generateToken(payload);

  const redirectUrl = `http://localhost:8083/api/v1/txn/process-on-ramp-txn?token=${encodeURIComponent(token)}`;

  const userData = await prisma.on_ramp_txn.create({
    data: {
      user_id: id,
      on_ramp_txn_id: txnId,
      amount,
      status: "PROCESSING"
    },
    select: {
      on_ramp_txn_id: true,
      status: true
    }
  });

  return res.status(200).json(
    new apiSuccessResponse(
      201,
      {
        status: userData.status,
        txnId: userData.on_ramp_txn_id,
        redirectUrl
      },
      "Transaction Processing, Redirecting to Netbanking"
    )
  );
});

export { onRampTransactions };