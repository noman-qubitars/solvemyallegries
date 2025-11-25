import nodemailer from "nodemailer";
import { config } from "../config/env";

const transporter = nodemailer.createTransport({
  host: config.email.host,
  port: config.email.port,
  secure: config.email.secure,
  auth: {
    user: config.email.user,
    pass: config.email.pass
  },
  tls: {
    rejectUnauthorized: false
  }
});

export const sendOtpEmail = async (recipient: string, otp: string) => {
  try {
    await transporter.sendMail({
      from: config.email.from,
      to: recipient,
      subject: "SolveMyAllergies reset code",
      text: `Use ${otp} to verify your request`
    });
  } catch (error: any) {
    console.error("Error sending OTP email:", error);
    throw new Error(`Failed to send email: ${error.message}`);
  }
};

export const sendSubscriptionEmail = async (
  email: string,
  firstName: string,
  lastName: string,
  password: string
) => {
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(to right, #11401c, #1f7332, #859b5b); color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: #f8f8f8; padding: 30px; border-radius: 0 0 8px 8px; }
        .button { display: inline-block; padding: 12px 24px; background: #11401c; color: white; text-decoration: none; border-radius: 6px; margin: 10px 5px; }
        .credentials { background: white; padding: 15px; border-radius: 6px; margin: 20px 0; border-left: 4px solid #11401c; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Thank You for Your Subscription!</h1>
        </div>
        <div class="content">
          <p>Dear ${firstName} ${lastName},</p>
          <p>Thank you for subscribing to SolveMyAllergies! We're excited to support you on your wellness journey.</p>
          
          <div class="credentials">
            <h3>Your Account Credentials:</h3>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Password:</strong> ${password}</p>
          </div>

          <p>Download our app to get started:</p>
          <a href="${config.app.playStoreUrl}" class="button" style="color: white;">Download on Play Store</a>
          <a href="${config.app.appStoreUrl}" class="button" style="color: white;">Download on App Store</a>

          
          <p>Best regards,<br>The SolveMyAllergies Team</p>
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    await transporter.sendMail({
      from: config.email.from,
      to: email,
      subject: "Welcome to SolveMyAllergies - Your Account Details",
      html: htmlContent
    });
  } catch (error: any) {
    console.error("Error sending subscription email:", error);
    throw new Error(`Failed to send email: ${error.message}`);
  }
};