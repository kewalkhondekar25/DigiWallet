import express from "express";
import cors from "cors";
import { Worker } from "bullmq"
import { sendWelcomeOtpEmail } from "./services/sendWelcomeOtpEmail.service";

const app = express();

app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true
}));

export const emailWorker = new Worker("email-otp-queue", async (job) => {
  switch (job.name) {
    case "send-welcome-otp":
      await sendWelcomeOtpEmail(job.data.name, job.data.email, job.data.OTP);
      break;
    default:
      break;
  }
  console.log("email job name: ", job.name);
  console.log("email job data", job.data);
}, {
  connection: {
    host: "localhost",
    port: 6379
  }
});



export { app };