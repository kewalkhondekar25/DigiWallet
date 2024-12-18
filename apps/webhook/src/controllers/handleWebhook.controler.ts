import { prisma } from "@repo/db/client";
import { decodeToken } from "../services/decode.service";
import apiErrorResponse from "../utils/apiErrorResponse";
import apiSuccessResponse from "../utils/apiSuccessResponse";
import asyncHandler from "../utils/asyncHandler";

const handleWebhook = asyncHandler( async (req, res) => {
  
  const { token } = req.query;

  if(!token || typeof token !== "string"){
    throw new apiErrorResponse(
      401,
      "No Token provided!!! or Invalid Token type!!!"
    )
  };

  const { id, amount, txnId } = decodeToken(token);
  
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

  return res.status(200).json(
    new apiSuccessResponse(
    200,
    "CAPTURE"
    )
  );
});

export { handleWebhook };