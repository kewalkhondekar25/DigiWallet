import { Request, Response, NextFunction } from "express";
import apiErrorResponse from "../utils/apiErrorResponse";

const errorHandler = (err: apiErrorResponse, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || 500;
  const response = {
    success: false,
    statusCode,
    message: err.message || "Internal Server Error",
    errors: err.errors || [],
  };
  res.status(statusCode).json(response);
};

export default errorHandler;