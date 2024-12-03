import dotenv from "dotenv";
import { app } from "./app";
dotenv.config({path: "./.env"});

app.get("/", (req, res) => {
  res.status(200).json({
    message: "welcome to API GATEWAY"
  });
});

app.listen(process.env.PORT, () => {
  console.log(`server is listening on port: ${process.env.PORT}`);
});