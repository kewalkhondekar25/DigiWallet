import express from "express";
import cors from "cors";
import errorHandler from "./middlewares/errorHandler.middleware";

const app = express();

app.use(express.json());
app.use(cors({
  origin: process.env.CORS_ORIGIN
}));

//routes import
import healthRouter from "./routes/health.route";

//routes impl
app.use("/api/v1", healthRouter);

app.use(errorHandler);

export default app;
