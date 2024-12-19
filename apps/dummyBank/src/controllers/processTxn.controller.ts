import axios from "axios";
import { decodeToken } from "../services/decodeToken.service";
import apiErrorResponse from "../utils/apiErrorResponse";
import apiSuccessResponse from "../utils/apiSuccessResponse";
import asyncHandler from "../utils/asyncHandler";
import { prisma } from "@repo/db/client";

const processOnRampTransaction = asyncHandler( async (req, res) => {

  const { token } = req.query;

  if(!token || typeof token !== "string"){
    throw new apiErrorResponse(
      401,
      "No Token provided!!! or Invalid Token type!!!"
    );
  };

  const decoded = decodeToken(token);
  const { id, amount, txnId } = decoded;

  try {
    const transaction = await prisma.$transaction(async (prisma) => {
  
      const onRampStatus = await prisma.on_ramp_txn.findUnique({
        where: {
          on_ramp_txn_id: txnId
        },
        select: {
          status: true
        }
      });
    
      if(onRampStatus?.status !== "PROCESSING"){
        throw new apiErrorResponse(
          409,
          "This Transaction is already either Success or Fail"
        )
      };
  
      const bankBalance = await prisma.user_bank_ballances.findUnique({
        where: {
          user_id: id
        },
        select: {
          amount
        }
      });
  
      if(!bankBalance){
        throw new apiErrorResponse(
          404,
          "No balance exist."
        )
      }
  
      if(bankBalance?.amount < amount){
        throw new apiErrorResponse(
          400,
          "Insufficient funds"
        )
      };
  
      await prisma.user_bank_ballances.update({
        where: {
          user_id: id
        },
        data: {
          amount: {
            decrement: Number(amount)
          }
        }
      });
  
      const currentBalance = await prisma.my_wallet_bank_ballances.findFirst();
      if(currentBalance){
        await prisma.my_wallet_bank_ballances.update({
          where: {
            id: currentBalance.id
          },
          data: {
            amount: {
              increment: Number(amount)
            }
          }
        })
      }else{
        await prisma.my_wallet_bank_ballances.create({
          data: {
            amount: Number(amount)
          }
        })
      };
    });
  } catch (error) {
    if(error instanceof Error){
      throw new apiErrorResponse(
        404,
        "Transaction Failed",
        error instanceof Error ? [error.message] : ["unknown error"]
      )
    };
    throw new apiErrorResponse(
      500,
      "Transaction failed due to a database error"
    )
  }
  
  try {
    const response = await axios.post("http://localhost:8084/api/v1/webhook/on-ramp-txn", null, {
      params: {
        token
      }
    });
    const data = await response.data;
    if(data.status < 200 || data.status >= 300){
      throw new apiErrorResponse(
        data.status,
        "Webhook call failed."
      )
    };
  } catch (error) {
    if(error instanceof Error){
      throw new apiErrorResponse(
        500,
        "An error occurred while calling the webhook.",
        error instanceof Error ? [error.message] : ["unknown error"]
      )
    }
  }

  return res.status(200).json(
    new apiSuccessResponse(
      200,
      { decoded },
      "Transaction successful"
    )
  );
});

const processOffRampTransaction = asyncHandler( async (req, res) => {
  //get token from query
  const { token } = req.query;

  if(!token || typeof token !== "string"){
    throw new apiErrorResponse(
      401,
      "No Token provided!!! or Invalid Token type!!!"
    )
  };

  const decoded = decodeToken(token);
  const { id, amount, txnId } = decoded;

  try {
    await prisma.$transaction( async( prisma) => {      

      const currentBalance = await prisma.my_wallet_bank_ballances.findFirst();

      if(!currentBalance || currentBalance.amount < amount){
        throw new apiErrorResponse(
          400,
          "Insufficient Funds"
        )
      };

      if(currentBalance){
        await prisma.my_wallet_bank_ballances.update({
          where: {
            id: currentBalance.id
          },
          data: {
            amount: {
              decrement: Number(amount)
            }
          }
        })
      }else{
        await prisma.my_wallet_bank_ballances.create({
          data: {
            amount: Number(amount)
          }
        })
      }

      await prisma.user_bank_ballances.update({
        where: {
          user_id: Number(id)
        },
        data: {
          amount: {
            increment: amount
          }
        }
      })
    })
  } catch (error) {
    if(error instanceof Error){
      throw new apiErrorResponse(
        404,
        "Transaction failed",
        error instanceof Error ? [error.message] : ["Unknown Error"]
      )
    };
    throw new apiErrorResponse(
      500,
      "Transaction failed"
    );
  };

  try {
    const response = await axios.post("http://localhost:8084/api/v1/webhook/off-ramp-txn", null, {
      params: {
        token
      }
    });
    const data = await response.data;    
    if(data.status < 200 || data.status >= 300){
      throw new apiErrorResponse(
        data.status,
        "Webhook call failed."
      )
    };
  } catch (error) {
    if(error instanceof Error){
      throw new apiErrorResponse(
        500,
        "An error occurred while calling the webhook.",
        error instanceof Error ? [error.message] : ["unknown error"]
      )
    }
  };

  return res.status(200).json(
    new apiSuccessResponse(
      200,
      { decoded },
      "Transaction successful"
    )
  );
})

export { 
  processOnRampTransaction,
  processOffRampTransaction
};