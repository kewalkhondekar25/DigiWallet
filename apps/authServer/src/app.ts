import express, { RequestHandler} from "express";
import cors from "cors";
import cookieParser from "cookie-parser"
import errorHandler from "./middlewares/errorHandler.middleware";
import fs from "fs";
import path from "path";
import YAML from "yaml";
import swaggerUi from "swagger-ui-express";

const file = fs.readFileSync(path.resolve(__dirname, "./swagger.yaml"), "utf8");
const swaggerDocument = YAML.parse(
  file.replace(
    "- url: ${server}",
    `- url: ${process.env.API_BASE_URL || "http://localhost:8080"}/api/v1`
  )
);

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
app.use(cookieParser());

//routes import
import userRouter from "./routes/user.route";
import healthCheckRouter from "./routes/healthCheck.route";
//routes declaration
app.use("/api/v1/health-check", healthCheckRouter);
app.use("/api/v1/user", userRouter);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(errorHandler);

export default app;