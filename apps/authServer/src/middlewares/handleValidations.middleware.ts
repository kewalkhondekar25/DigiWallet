import { Request, Response, NextFunction } from "express"
import { z, ZodType, ZodError } from "zod";

const handleValidations = ( schema: ZodType) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      req.body = schema.safeParse(req.body);
      next();
    } catch (error) {
      if(error instanceof ZodError){
        const formattedErrors = error.errors.map((err) => ({
          path: err.path.join("."),
          message: err.message,
        }));
        res.status(400).json({
          message: "Invalid input",
          errors: formattedErrors,
        });
      }else{
        next(error)
      }
    }
  };
};

export default handleValidations;