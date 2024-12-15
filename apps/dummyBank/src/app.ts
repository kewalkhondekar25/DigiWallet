import express from "express";
import cors from "cors";
import errorHandler from "./middlewares/errorHandler";

const app = express();

app.use(express.json());
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true
}));

import txnRouter from "./routes/txn.route";
app.use("/api/v1/txn", txnRouter);

app.use(errorHandler);

export default app;