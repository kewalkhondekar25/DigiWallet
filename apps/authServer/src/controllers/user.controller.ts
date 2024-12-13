import asyncHandler from "../utils/asyncHandler";
import apiSuccessResponse from "../utils/apiSuccessResponse";
import { prisma, Prisma } from "@repo/db/client";
import apiErrorResponse from "../utils/apiErrorResponse";
import { decryptData, encryptData } from "../services/encription.service";
import { SignUpRequestBody } from "../types/userInterfaces.types";
import { expireOtp, generateOtp } from "../utils/otpOperations";
import { isOtpExpire } from "../utils/calculateOtpExpiry";
import { getCurrentTime } from "../utils/getCurrentTime";
import { generateAccessToken, generateRefreshToken } from "../services/generateTokens.service";
import { emailOtpQueue } from "../services/queue.service";

const signUpUser = asyncHandler( async (req, res) => {

  const { name, email, password }: SignUpRequestBody = req.body;

  const encodedPassword = await encryptData(password);

  try {
    const newUser = await prisma.users.create({
      data: {
        name,
        email,
        password: encodedPassword,
      },
      select: {
        id: true,
        name: true,
        email: true,
        isVerified: true,
        createdAt: true
      }
    });

    const generatedOtp = generateOtp();
    
    const otpToSend = await encryptData(generatedOtp);
    const expirationTimeStamp = expireOtp();
    
    const otpData = await prisma.otps.create({
      data:{
        otp: otpToSend,
        expiresAt: expirationTimeStamp,
        user_id: newUser.id
      }
    });

    await emailOtpQueue.add("send-otp", {
      name: name,
      email: email,
      OTP: generatedOtp
      }
    );
    
    return res.status(201).json(
      new apiSuccessResponse(
        201,
        { user: newUser },
        "User signed up successfully. OTP has been sent to your email."
      )
    );
  }catch(error){
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

const signInUser = asyncHandler( async (req, res) => {

  const { email, password } = req.body;

  const user = await prisma.users.findUnique({
    where: {
      email
    },
    select: {
      id: true,
      name: true,
      email: true,
      password: true,
      isVerified: true
    }
  });

  if(!user){
    throw new apiErrorResponse(
      404,
      "User with email not found."
    )
  };

  if(!user.isVerified){
    throw new apiErrorResponse(
      403,
      "User is not verified, please verify your account"
    )
  };

  const recivedPassword = password;
  const encryptedPassword = user.password;
  const isPasswordCorrect = await decryptData(recivedPassword, encryptedPassword);
  if(!isPasswordCorrect){
    throw new apiErrorResponse(
      401,
      "Incorrect password, please try again"
    )
  };
  //save refresh token in users db
  const accessTokenPayload = {
    id: user.id,
    name: user.name,
    email: user.email
  };
  const refreshTokenPayload = {
    id: user.id
  };

  const accessToken = generateAccessToken(accessTokenPayload);
  const refreshToken = generateRefreshToken(refreshTokenPayload);

  const options = {
    httpOnly: true,
    secure: true
}

  return res
  .status(200)
  .cookie("accessToken", accessToken, options)
  .cookie("refreshToken", refreshToken, options)
  .json(
    new apiSuccessResponse(
      200,
      "User signed in successfully.",
    )
  );
});

const verifyOtp = asyncHandler( async (req, res) => {

  const { id, otp: recivedOtp } = req.body;
  
  const otpData = await prisma.otps.findUnique({
    where: {
      user_id: id
    },
    select: {
      otp: true,
      expiresAt: true,
      blockUntil: true,
      retryCount: true,
      user_id: true
    }
  });

  if(!otpData){
    throw new apiErrorResponse(
      404,
      "OTP data not found for the user."
    )
  }

  if(otpData.retryCount >= 3){

    const blockUntil = new Date(getCurrentTime() + 15 * 60 * 1000);
    
    await prisma.otps.update({
      where: {
        user_id: otpData.user_id
      },
      data: {
        blockUntil
      }
    })
    throw new apiErrorResponse(
      429,
      "Too many invalid OTP attempts. Try again after 15 minutes."
    );
  };
  
  if(otpData.expiresAt && isOtpExpire(otpData.expiresAt)){
    throw new apiErrorResponse(
      410,
      "The OTP has expired. Please request a new one."
    )
  };
  
  if(!otpData.otp){
    throw new apiErrorResponse(
      400,
      "No OTP found for the user. Please request a new OTP."
    )
  };

  const recivedEncryptOtp = otpData?.otp;
  const recivedDecryptOtp = await decryptData(recivedOtp, recivedEncryptOtp);
  
  if(!recivedDecryptOtp){
    const attemptsData = await prisma.otps.update({
      where: {
        user_id: otpData.user_id
      },
      data: {
        retryCount: { increment: 1},
      },
      select: {
        retryCount: true
      }
    });
    throw new apiErrorResponse(
      400,
      `Incorrect OTP!. you have ${3 - attemptsData.retryCount} attempts remaining`
    )
  };

  await prisma.users.update({
    where: {
      id
    }, 
    data: {
      isVerified: true
    }
  });

  return res.status(200).json(
    new apiSuccessResponse(
      200,
      "OTP! verified successfully"
    )
  );
});

const resendOtp = asyncHandler( async (req, res) => {

  const { id } = req.body;

  const isUserExist = await prisma.users.findUnique({
    where: {
      id
    },
    select: {
      id: true
    }
  });

  if(!isUserExist){
    throw new apiErrorResponse(
      400,
      "User not found."
    )
  };

  const generatedOtp = generateOtp();
  const encryptedOtp = await encryptData(generatedOtp);
  const expirationTimeStamp = expireOtp();

  await prisma.otps.update({
    where: {
      user_id: id
    },
    data: {
      otp: encryptedOtp,
      expiresAt: expirationTimeStamp,
      retryCount: 0,
    },
    select: {
      otp: true
    }
  });

  return res.status(201).json(
    new apiSuccessResponse(
      201,
      "A new OTP has been generated and sent to your email"
    )
  );
});



export {
  signUpUser,
  signInUser,
  verifyOtp,
  resendOtp
};