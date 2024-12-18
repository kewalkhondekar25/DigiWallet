import jwt, { JwtPayload } from "jsonwebtoken";
import apiErrorResponse from "../utils/apiErrorResponse";

const decodeToken = (payload: string) => {

  if(!process.env.SECRET_KEY){
    throw new apiErrorResponse(
      500,
      "No Secret key provided"
    )
  };
  return jwt.verify(payload, process.env.SECRET_KEY) as JwtPayload
};

export { decodeToken };