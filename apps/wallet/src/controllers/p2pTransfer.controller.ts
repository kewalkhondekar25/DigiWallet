import { prisma } from "@repo/db/client";
import asyncHandler from "../utils/asyncHandler";
import apiErrorResponse from "../utils/apiErrorResponse";
import apiSuccessResponse from "../utils/apiSuccessResponse";

const p2pTransfer = asyncHandler( async (req, res) => {

  const { fromUserId, toUserId, amount } = req.body;

  const reciversData = await prisma.users.findUnique({
    where: {
      id: Number(toUserId)
    },
    select: {
      id: true
    }
  });

  if(!reciversData || !reciversData.id){
    throw new apiErrorResponse(
      404,
      "Recipient user not found."
    );
  };

  try {
    await prisma.$transaction( async (prisma) => {

      await prisma.$queryRaw `SELECT * FROM "wallet_balances" WHERE user_id = ${fromUserId} FOR UPDATE`;

      const recipentsData = await prisma.wallet_balances.findUnique({
        where: {
          user_id: Number(fromUserId)
        },
        select: {
          amount: true
        }
      });

      if(!recipentsData || recipentsData.amount < Number(amount)){
        throw new apiErrorResponse(
          402,
          "Insufficient Wallet Balance!"
        );
      };

      await prisma.wallet_balances.update({
        where: {
          user_id: Number(fromUserId)
        },
        data: {
          amount: {
            decrement: Number(amount)
          }
        }
      });

      await prisma.wallet_balances.update({
        where: {
          user_id: Number(toUserId)
        },
        data: {
          amount: {
            increment: Number(amount)
          }
        }
      });

      await prisma.p2p_transfer.create({
        data: {
          recipentsId: Number(fromUserId),
          reciversId: Number(toUserId),
          amount: Number(amount)
        }
      });
    });

    return res.status(200).json(
      new apiSuccessResponse(
        201,
        "Amount Transfered Successfully"
      )
    );
    
  } catch (error) {
    if(error instanceof apiErrorResponse){
      throw error
    };
    throw new apiErrorResponse(
      500,
      "Internal Server Error"
    );
  };
});

export {
  p2pTransfer
};