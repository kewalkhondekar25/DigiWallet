import { prisma } from "@repo/db/client";
import asyncHandler from "../utils/asyncHandler";
import apiSuccessResponse from "../utils/apiSuccessResponse";

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
  getP2pTransfers
}