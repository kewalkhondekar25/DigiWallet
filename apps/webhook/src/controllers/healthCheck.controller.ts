import apiSuccessResponse from "../utils/apiSuccessResponse";
import asyncHandler from "../utils/asyncHandler";

const healthCheck = asyncHandler( async (req, res) => {
  return res.status(200).json(
    new apiSuccessResponse(
      200,
      "Health Check Passed! - Webhook"
    )
  );
});

export { healthCheck };