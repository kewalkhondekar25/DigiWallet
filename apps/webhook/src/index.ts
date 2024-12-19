import dotenv from "dotenv";
dotenv.config({ path: "./.env"});
import app from "./app";

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to digiwallet's Webhook!"
  });
});

app.listen(process.env.PORT, () => {
  console.log(`SERVR IS LISTENING ON PORT: ${process.env.PORT}`);
});