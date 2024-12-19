import { prisma } from "@repo/db/client";
import asyncHandler from "../utils/asyncHandler";
import apiErrorResponse from "../utils/apiErrorResponse";
import { generateToken } from "../services/generateToken";
import axios from "axios";
import apiSuccessResponse from "../utils/apiSuccessResponse";

const   offRampTransactions = asyncHandler( async (req, res) => {
  //take id, amount from body
  const { id, amount } = req.body;

  //check off ramp amount < wallet balance
  const walletBalance = await prisma.wallet_balances.findUnique({
    where: {
      user_id: id
    },
    select: {
      amount: true
    }
  });

  if(!walletBalance){
    throw new apiErrorResponse(
      404,
      "No Wallet balance found!"
    )
  };

  if(walletBalance.amount < amount){
    throw new apiErrorResponse(
      402,
      "Insufficient Funds in Wallet"
    );
  };

  //generate offRampTxnId
  const txnId = crypto.randomUUID();

  //processing off ramp txn
  const offRampTxnData = await prisma.off_ramp_txn.create({
    data: {
      user_id: id,  
      off_ramp_txn_id: txnId,
      amount: Number(amount),
      status: "PROCESSING"
    },
    select: {
      off_ramp_txn_id: true,
      amount: true,
      status: true,
      createdAt: true
    }
  });

  const payload = { id, amount, txnId};
  //create token
  const token = generateToken(payload);
  //hit bank api offramp, send token

  try {
    const response = await axios.post("http://localhost:8083/api/v1/txn/process-off-ramp-txn", null, {
      params: {
        token
      }
    })
  } catch (error) {
    if(error instanceof Error){
      throw new apiErrorResponse(
        404,
        "Error while connecting to Bank",
        error instanceof Error ? [error.message] : ["Unknown Error"]
      )
    }
  }

  return res.status(201).json(
    new apiSuccessResponse(
      201,
      offRampTxnData,
      "Transaction Processing",
    )
  );
});

export { offRampTransactions };