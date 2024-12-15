import jwt from "jsonwebtoken";
import { TokenType } from "../types/token.type";
import apiErrorResponse from "../utils/apiErrorResponse";


export const generateToken = (payload: TokenType) => {

  if(!process.env.SECRET_KEY){
    throw new apiErrorResponse(
      500,
      "No Secret key provided"
    )
  };

  return jwt.sign(
    payload,
    process.env.SECRET_KEY,
    { expiresIn: "1d"}
  );
;}