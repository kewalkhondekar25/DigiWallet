import express, { Request, Response } from "express";
import cors from "cors"
import { services } from "./utils/services";
import { createProxyMiddleware } from "http-proxy-middleware";
import { ClientRequest } from "http"

const app = express();

//middlewares
app.use(express.json());
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true,
}));

//proxy middleware
services.forEach(({ route, target }) => {
  const proxyOptions = {
    target: target,
    changeOrigin: true,
    pathRewrite: { [`^${route}`]: "" },
  };

  console.log(`route: ${route} with target: ${target}`);
  app.use(route, createProxyMiddleware(proxyOptions));
});

export { app };