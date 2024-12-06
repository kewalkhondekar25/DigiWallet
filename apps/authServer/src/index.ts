import dotenv from "dotenv";
import apiSuccessResponse from "./utils/apiSuccessResponse";
dotenv.config( {path: "./.env"});
import app from "./app";

app.get("/", (req, res) => {
  res.status(200).json(
    new apiSuccessResponse(200, "WELCOME TO AUTH SERVER")
  );
});

app.listen(process.env.PORT, () => {
  console.log(`SERVER IS LISTENING ON PORT: ${process.env.PORT}`);
});