import express, { Request, Response } from "express";
import cors from "cors"
import { services } from "./utils/services";
import { createProxyMiddleware, Options } from "http-proxy-middleware";
import { ClientRequest } from "http"

interface CustomProxyOptions extends Options {
  onProxyReq?: (proxyReq: any, req: Request, res: Response) => void;
  onProxyRes?: (proxyRes: any, req: Request, res: Response) => void;
  onError?: (err: any, req: Request, res: Response) => void;
}

const app = express();

//middlewares
app.use(express.json());
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true,
}));

//proxy middleware
// services.forEach(({ route, target }) => {
//   const proxyOptions = {
//     target: target,
//     changeOrigin: true,
//     pathRewrite: { [`^${route}`]: "" },
//   };

//   console.log(`route: ${route} with target: ${target}`);
//   app.use(route, createProxyMiddleware(proxyOptions));
// });

services.forEach(({ route, target }) => {
  console.log(`Setting up proxy: ${route} -> ${target}`);
  app.use(route, createProxyMiddleware({
    target: target,
    pathRewrite: {
      [`^${route}`]: ''
    }
  }));
});


export { app };