import express from "express";
import cors from "cors";
import nodemailer from "nodemailer"

const app = express();

app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true
}));

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
} as nodemailer.TransportOptions);


async function sendEmail() {
  try {
    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: "example@gmail.com",
      subject: "Welcome to DigiWallet",
      text: "Hello Kewal from DigiWallet",
      html: "<b>Hello Kewal from DigiWallet</b>",
    });

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

sendEmail();

export { app };