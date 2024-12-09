import { accessTokenType, refreshTokenType } from "../types/userInterfaces.types";
import jwt from "jsonwebtoken"
import apiErrorResponse from "../utils/apiErrorResponse";

const generateAccessToken =  (payload: accessTokenType) => {

  if(!process.env.ACCESS_TOKEN_SECRET){
    throw new apiErrorResponse(
      500,
      "Internal Server Error",
      ["ACCESS_TOKEN_SECRET environment variable is not set. Please check server configuration."]
    )
  };
  
  return jwt.sign(
    { 
      payload
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }
  );
};

const generateRefreshToken = (payload: refreshTokenType) => {

  if(!process.env.REFRESH_TOKEN_SECRET){
    throw new apiErrorResponse(
      500,
      "Internal Server Error",
      ["ACCESS_TOKEN_SECRET environment variable is not set. Please check server configuration."]
    )
  };

  return jwt.sign(
    {
      payload
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    }
  );
};

export {
  generateAccessToken,
  generateRefreshToken
};