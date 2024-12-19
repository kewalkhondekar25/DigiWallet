import { prisma } from "@repo/db/client";
import { decodeToken } from "../services/decode.service";
import apiErrorResponse from "../utils/apiErrorResponse";
import apiSuccessResponse from "../utils/apiSuccessResponse";
import asyncHandler from "../utils/asyncHandler";

const handleOnRampTransaction = asyncHandler( async (req, res) => {
  
  const { token } = req.query;

  if(!token || typeof token !== "string"){
    throw new apiErrorResponse(
      401,
      "No Token provided!!! or Invalid Token type!!!"
    )
  };

  const { id, amount, txnId } = decodeToken(token);
  
  try {
    await prisma.$transaction([
      prisma.wallet_balances.update({
        where: {
          user_id: id
        },
        data: {
          amount: {
            increment: Number(amount)
          }
        }
      }),
      prisma.on_ramp_txn.update({
        where: {
          on_ramp_txn_id: txnId
        },
        data: {
          amount,
          status: "SUCCESS"
        }
      })
    ]);
  } catch (error) {
    if(error instanceof Error){
      throw new apiErrorResponse(
        404,
        "Webhook failed.",
        error instanceof Error ? [error.message] : ["unknown error"]
      )
    };
    throw new apiErrorResponse(
      500,
      "Webhook failed due to a database error"
    )
  }

  return res.status(200).json(
    new apiSuccessResponse(
    200,
    "CAPTURE"
    )
  );
});

const handleOffRampTransaction = asyncHandler( async (req, res) => {
  //gets token from query
  const { token } = req.query;

  if(!token || typeof token !== "string"){
    throw new apiErrorResponse(
      401,
      "No Token provided!!! or Invalid Token type!"
    )
  }

  const decode = decodeToken(token);
  const { id, amount, txnId } = decode;

  try {
    await prisma.$transaction( async(prisma) => {
      //debit user's wallet balance
      await prisma.wallet_balances.update({
        where: {
          user_id: id
        },
        data: {
          amount: {
            decrement: Number(amount)
          }
        }
      });
      //status success
      await prisma.off_ramp_txn.update({
        where: {
          off_ramp_txn_id: txnId
        },
        data: {
          status: "SUCCESS"
        }
      });
    });
  } catch (error) {
    if(error instanceof Error){
      throw new apiErrorResponse(
        404,
        "Webhook Failed",
        error instanceof Error ? [error.message] : ["Unknown Error"]
      )
    };
    throw new apiErrorResponse(
      500,
      "Webhook failed due to a database error"
    );
  };

  return res.status(200).json(
    new apiSuccessResponse(
      200,
      "CAPTURE"
    )
  );
});

export { 
  handleOnRampTransaction,
  handleOffRampTransaction
};