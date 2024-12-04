import dotenv from "dotenv";
import { app } from "./app";
dotenv.config( {path: "./.env"});

app.get("/", (req, res) => {
  console.log("Request to /", req.headers);
  res.status(200).json({
    message: "welcome to AUTH SERVER"
  });
});

app.listen(parseInt(process.env.PORT || "8080"), "127.0.0.1", () => {
  console.log(`server is listening on port: ${process.env.PORT}`);
});