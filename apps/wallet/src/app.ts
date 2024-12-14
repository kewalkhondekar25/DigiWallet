import express from "express";
import cors from "cors";
import errorHandler from "./middlewares/errorHandler.middleware";

const app = express();

app.use(express.json());
app.use(cors({
  origin: process.env.CORS_ORIGIN
}));

app.use(errorHandler);

export { app };
