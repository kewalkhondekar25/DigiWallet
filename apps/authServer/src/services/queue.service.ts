import { Queue } from "bullmq";

const emailOtpQueue = new Queue("email-otp-queue");

export {
  emailOtpQueue
};