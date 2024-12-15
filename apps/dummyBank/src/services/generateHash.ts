import crypto from "crypto";
import apiErrorResponse from "../utils/apiErrorResponse";

export const generateHash = (payload: string) => {

  if(!process.env.SECRET_KEY){
    throw new apiErrorResponse(
      500,
      "No Secret key provided"
    )
  };

  return crypto
  .createHmac("sha256", process.env.SECRET_KEY)
  .update(payload).digest("hex");
}