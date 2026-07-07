import nodemailer from "nodemailer";

const sendEmail = async ({ to, subject, html }) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: `"Flux" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });

    return true;
  } catch (error) {
    console.error("Email error:", error);
    return false;
  }
};
export default sendEmail;
