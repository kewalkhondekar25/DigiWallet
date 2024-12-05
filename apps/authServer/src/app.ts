import express from "express";
import cors from "cors"
import errorHandler from "./middlewares/errorHandler.middleware";

const app = express();

app.use(express.json());
app.use(express.json({
  limit: "16kb"
}));
app.use(express.urlencoded({
  extended: true,
  limit: "16kb"
}));
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true,
}));

//routes import
import userRouter from "./routes/user.route";
import healthCheckRouter from "./routes/healthCheck.route";

//routes declaration
app.use("/api/v1/health-check", healthCheckRouter);
app.use("/api/v1/user", userRouter);

app.use(errorHandler);

export default app;