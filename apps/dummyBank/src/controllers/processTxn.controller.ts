import { decodeToken } from "../services/decodeToken.service";
import { generateHash } from "../services/generateHash";
import apiErrorResponse from "../utils/apiErrorResponse";
import apiSuccessResponse from "../utils/apiSuccessResponse";
import asyncHandler from "../utils/asyncHandler";

const processOnRampTransaction = asyncHandler( async (req, res) => {

  const { token } = req.query;

  if(!token || typeof token !== "string"){
    throw new apiErrorResponse(
      401,
      "No token provided or token is not a string"
    );
  };

  const decoded = decodeToken(token);
  
  return res.status(200).json(
    new apiSuccessResponse(
      200,
      { decoded },
      "Transaction successful"
    )
  );
});

export { processOnRampTransaction };