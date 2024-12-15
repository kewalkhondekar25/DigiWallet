import dotenv from "dotenv";
dotenv.config({ path: "./.env"});

import app from "./app";

app.get("/", () => {
  console.log("Welcome to dummy Bank Server");
});

app.listen(process.env.PORT, () => {
  console.log(`SERVER IS LISTENING ON PORT: ${process.env.PORT}`);
});