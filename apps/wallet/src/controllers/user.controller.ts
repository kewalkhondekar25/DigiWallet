import { prisma } from "@repo/db/client";
import asyncHandler from "../utils/asyncHandler";
import apiSuccessResponse from "../utils/apiSuccessResponse";

const getUsersData = asyncHandler( async (req, res) => {
  const { id } = req.body;
  const data = await prisma.users.findUnique({
    where: {
      id: Number(id)
    },
    select: {
      name: true,
      email: true,
      wallet_balances: {
        select: {
          amount: true
        }
      },
      user_bank_ballances: {
        select: {
          amount: true
        }
      }
    }
  });

  return res.status(200).json(
    new apiSuccessResponse(
      201,
      data,
      "user data retrived successfully"
    )
  );
});

const getP2pTransfers = asyncHandler( async (req, res) => {
  //get userid
  const { id } = req.body;
  const p2pData = await prisma.p2p_transfer.findMany({
    where: {
      OR: [
        { recipentsId: Number(id) },
        { reciversId: Number(id) }
      ]
    },
    select: {
      amount: true,
      createdAt: true,
      fromUser: {
        select: {
          name: true
        }
      },
      toUser: {
        select: {
          name: true
        }
      }
    },
    orderBy: {
      createdAt: "desc"
    }
  })
  return res.status(200).json(
    new apiSuccessResponse(
      200,
      p2pData,
      "p2p transfers fetched successfully."
    )
  )
  //if not error
  
  //fetch trnsfr
});

export {
  getUsersData,
  getP2pTransfers
}