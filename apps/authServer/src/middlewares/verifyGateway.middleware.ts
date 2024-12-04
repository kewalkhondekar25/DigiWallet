import { Request, Response, NextFunction } from "express";

export type AuthRequest = Request & {
  headers: {
    "x-api-gateway-secret"?: string;
  };
};

const verifyGatewaySecret = (req: AuthRequest, res: Response, next: NextFunction): void => {
  
  const apiGatewaySecret = req.headers["x-api-gateway-secret"];

  if(apiGatewaySecret !== process.env.API_GATEWAY_SECRET){
    console.log("Invalid Gateway Secret. Received:", apiGatewaySecret);
    res.status(403).json({ 
      message: "Forbidden: Invalid Gateway Secret"
    });
    return;
  };

  next();
};

export { verifyGatewaySecret };