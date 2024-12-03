import express from "express";
import cors from "cors"
import { services } from "./utils/services";
import { ClientRequest } from "http"
import { createProxyMiddleware } from "http-proxy-middleware";

const app = express();

//middlewares
app.use(express.json());
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true
}));

//proxy middleware
services.forEach(({ route, target }) => {
  const proxyOptions: {
    target: string,
    changeOrigin: boolean,
    pathRewrite: { [key: string]: string},
    onProxyReq: (proxyReq: ClientRequest, req: Request) => void
  } = {
    target,
    changeOrigin: true,
    pathRewrite: { [`^${route}`]: ""},
    onProxyReq: (proxyReq, req) => {
      proxyReq.setHeader("X-Gateway-Secret", process.env.API_GATEWAY_SECRET || "");
    }
  }
  app.use(route, createProxyMiddleware(proxyOptions));
});

export { app };