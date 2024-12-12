import dotenv from "dotenv";
dotenv.config({
  path: "./.env"
});

import { app } from "./app";

app.get("/api/v1/health-check", (req, res) => {
  res.status(200).json({
    message: "health check passed"
  })
});

app.listen(process.env.PORT, () => {
  console.log(`SERVER IS LISTENING ON PORT: ${process.env.PORT}`);
});