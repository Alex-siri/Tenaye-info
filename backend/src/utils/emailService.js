const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  try {
    // Check if credentials exist
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.warn("⚠️ EMAIL_USER or EMAIL_PASS not set in .env. Falling back to console output.");
      return;
    }

    const transporter = nodemailer.createTransport({
      service: 'Gmail', // You can change this to another service like SendGrid or Outlook
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `Tenaye Info <${process.env.EMAIL_USER}>`,
      to: options.email,
      subject: options.subject,
      text: options.message,
      html: options.html,
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ Email successfully sent to ${options.email}`);
  } catch (error) {
    console.error(`❌ Failed to send email to ${options.email}:`, error);
  }
};

module.exports = sendEmail;
