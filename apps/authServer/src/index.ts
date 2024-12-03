import express from "express"
import db from "@repo/db/client"

const app = express();
const port = 8080;

app.get("/", (req, res) => {
  res.status(200).json({
    message: "welcome to auth microservice"
  });
});

app.listen(port, () => {
  console.log(`server is listening on port: ${port}`);
});