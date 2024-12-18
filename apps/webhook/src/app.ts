import express from "express";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true
}));

import healthCheckRouter from "./routes/healthCheck.route";
import webhookRouter from "./routes/webhook.route";

app.use("/api/v1/health-check", healthCheckRouter);
app.use("/api/v1/webhook", webhookRouter);

export default app;
