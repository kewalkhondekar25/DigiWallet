import bcrypt from "bcryptjs"
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

const decryptData = async ( payload: string, encryptedPayload: string): Promise<Boolean> => {
  try {
    const decryptStatus = await bcrypt.compare(payload, encryptedPayload);
    return decryptStatus;
  } catch (error) {
    throw new apiErrorResponse(
      500,
      "Failed to decrypt data",
      error instanceof Error ? [error.message] : ["unknown error"]
    )
  }
};

export {
  encryptData,
  decryptData
}