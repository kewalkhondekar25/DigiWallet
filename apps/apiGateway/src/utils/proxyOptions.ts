import { Request } from "express";
import { ClientRequest } from "http"
import { services } from "../utils/services";

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
      proxyReq.setHeader("X-Gateway-Secret", process.env.GATEWAY_SECRET || "");
    }
  }
});

export {}