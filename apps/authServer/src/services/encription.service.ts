import bcrypt from "bcrypt"
import apiErrorResponse from "../utils/apiErrorResponse";

const encryptData = async (payload: string): Promise<string> => {
  try {
    const encodedData = await bcrypt.hash(payload, 10);
    return encodedData;
  } catch (error) {
    throw new apiErrorResponse(
      500,
      "Failed to encrypt data",
      error instanceof Error ? [error.message] : ["unknown error"]
    )
  }
};

export {
  encryptData
}