import asyncHandler from "../utils/asyncHandler";
import apiSuccessResponse from "../utils/apiSuccessResponse";
import prisma from "@repo/db/client";

const signUpUser = asyncHandler( async (req, res) => {

  //take input
  //check if existing user with email exists, if yes give error
  //if no then register
  
  const { name, email, password } = req.body;
  

  return res.status(201).json(
    new apiSuccessResponse(201, "SignUp Success")
  );
}); 

export {
  signUpUser
};