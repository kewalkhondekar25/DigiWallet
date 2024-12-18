import jwt, { JwtPayload} from "jsonwebtoken";
import apiErrorResponse from "../utils/apiErrorResponse";

export const decodeToken = (token: string) => {

  if(!process.env.SECRET_KEY){
    throw new apiErrorResponse(
      500,
      "No Secret key provided"
    )
  };

  return jwt.verify(token, process.env.SECRET_KEY) as JwtPayload;
};