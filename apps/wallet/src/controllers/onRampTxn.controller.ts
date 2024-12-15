import { prisma } from "@repo/db/client";
import apiErrorResponse from "../utils/apiErrorResponse";
import apiSuccessResponse from "../utils/apiSuccessResponse";
import asyncHandler from "../utils/asyncHandler";
import crypto from "crypto";
import { generateHash } from "../services/generateHash.service";

const onRampTransactions = asyncHandler( async (req, res) => {

  if(!process.env.SECRET_KEY){
    throw new apiErrorResponse(
      500,
      "No Secret key provided"
    )
  };
  
  const { id, amount }= req.body;

  const txnId = crypto.randomUUID();

  const payload = JSON.stringify({ id, amount, txnId});
  const secureHash = generateHash(payload);
  
  const token = Buffer.from(`${payload}.${secureHash}`).toString("base64");

  const redirectUrl = `http://localhost:8083/netbanking?token=${encodeURIComponent(token)}`;

  // await prisma.on_ramp_txn.create({
  //   data: {
  //     user_id: id,
  //     on_ramp_txn_id: txnId,
  //     amount,
  //     status: "PROCESSING"
  //   }
  // });

  return res.status(200).json(
    new apiSuccessResponse(
      200,
      { redirectUrl },
      "Processing, Redirect to SBI Netbanking"
    )
  );
});

export { onRampTransactions };