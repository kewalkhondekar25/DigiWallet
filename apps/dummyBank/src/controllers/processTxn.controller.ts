import axios from "axios";
import { decodeToken } from "../services/decodeToken.service";
import apiErrorResponse from "../utils/apiErrorResponse";
import apiSuccessResponse from "../utils/apiSuccessResponse";
import asyncHandler from "../utils/asyncHandler";

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

  //credits digiwallets a/c
  //creates record
  //hits webhook
  try {
    const response = await axios.post("http://localhost:8084/api/v1/webhook", null, {
      params: {
        token
      }
    });
    const data = await response.data;
  } catch (error) {
    console.log(error);
  }

  return res.status(200).json(
    new apiSuccessResponse(
      200,
      { decoded },
      "Transaction successful"
    )
  );
});

export { processOnRampTransaction };