import asyncHandler from "../utils/asyncHandler";
import apiSuccessResponse from "../utils/apiSuccessResponse";
import { prisma, Prisma } from "@repo/db/client";
import apiErrorResponse from "../utils/apiErrorResponse";
import { encryptData } from "../services/encription.service";
import { SignUpRequestBody } from "../types/userInterfaces.types";

const signUpUser = asyncHandler( async (req, res) => {

  const { name, email, password }: SignUpRequestBody = req.body;

  const encodedPassword = await encryptData(password);

  try {
    const newUser = await prisma.users.create({
      data: {
        name,
        email,
        password: encodedPassword
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true
      }
    });

    return res.status(201).json(
      new apiSuccessResponse(
        201,
        newUser,
        "User SignedUp Successfully"
      )
    );
  } catch (error) {

    if(error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002"){
      return res.status(409).json(
        new apiSuccessResponse(
          409,
          "Email already exists. Please use a different email."
        )
      );
    };

    console.log(error);
    throw new apiErrorResponse(
      500,
      "Something went wrong while registering the user"
    );
  };
}); 

export {
  signUpUser
};