import { transporter } from "../utils/smtp";
import nodemailer from "nodemailer";

const contactEmail = process.env.CONTACT_EMAIL;

const sendWelcomeOtpEmail = async (name: string, email: string, otp: string) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: `${email}`,
      subject: "Welcome to DigiWallet",
      text: "Hello from DigiWallet",
      html: `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Welcome to DigiWallet</title>
          <style>
            body {
              font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
              margin: 0;
              padding: 0;
              background-color: #121212;
            }
            .email-container {
              width: 100%;
              max-width: 600px;
              margin: 0 auto;
              background-color: #1e1e1e;
              border-radius: 8px;
              box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
              overflow: hidden;
            }
            .email-header {
              background-color: #E33E3F; /* Updated header color */
              color: #ffffff;
              padding: 40px 30px;
              text-align: center;
            }
            .email-header h1 {
              margin: 0;
              font-size: 32px;
            }
            .email-header p {
              margin: 8px 0 0;
              font-size: 18px;
            }
            .email-body {
              padding: 40px 30px;
              color: #ffffff;
            }
            .otp-container {
              background-color: #2a2a2a;
              padding: 20px;
              border-radius: 8px;
              margin-top: 30px;
              text-align: center;
            }
            .otp {
              font-size: 36px;
              font-weight: bold;
              color: white;
              background-color: #4e4e4e;
              padding: 20px;
              border-radius: 8px;
              display: inline-block;
              margin: 20px 0;
            }
            .footer {
              background-color: #121212;
              padding: 20px;
              text-align: center;
              color: #aaa;
              font-size: 12px;
            }
            .footer a {
              color: #E33E3F; /* Footer link color */
              text-decoration: none;
            }
            .footer a:hover {
              text-decoration: underline;
            }
            .footer p {
              margin: 0;
            }
          </style>
        </head>
        <body>
          <div class="email-container">
            <div class="email-header">
              <h1>Welcome to DigiWallet!</h1>
              <p>You're just one step away from completing your account setup.</p>
            </div>
            <div class="email-body">
              <p>Hi <strong>${name}</strong>,</p>
              <p>Thank you for joining DigiWallet! We are excited to have you with us.</p>
              <p>To complete your registration and verify your identity, please use the OTP below:</p>
              
              <div class="otp-container">
                <div class="otp">${otp}</div>
              </div>
              
              <p>This OTP is valid for 15 minutes. If you didn’t request this, please ignore this email.</p>
            </div>
            <div class="footer">
              <p>© 2024 DigiWallet. All Rights Reserved.</p>
              <p>If you need help, feel free to <a href="mailto:${contactEmail}">contact us</a>.</p>
            </div>
          </div>
        </body>
      </html>
      `,
    });
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  }catch(error){
    console.error("Error sending email: ", error);
  }
};

export {
  sendWelcomeOtpEmail
};