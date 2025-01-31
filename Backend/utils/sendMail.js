import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const sendMail = async (email, tempPassword) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "hafizm.furqan456@gmail.com",
      pass: "wupp lqlb llke bzrk",
    },
  });

  let mailOptions = {
    from: '"Saylani Welfare" <hafizm.furqan456@gmail.com>',
    to: email,
    subject: "Saylani Welfare Loan Request",
    html: `
            <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4;">
                <div style="max-width: 600px; margin: auto; background: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
                    <h2 style="color: #333; text-align: center;">Saylani Welfare Loan Request</h2>
                    <p>Dear User,</p>
                    <p>Your loan request has been received successfully. Below is your temporary password:</p>
                    
                    <p style="text-align: center; font-weight: bold;">Copy the temporary password manually:</p>
                    <div style="text-align: center; margin: 20px 0;">
                        <input type="text" value="${tempPassword}" readonly 
                            style="padding: 10px; font-size: 16px; text-align: center; border: 1px solid #ddd; border-radius: 5px; width: 80%;" />
                    </div>

                    <p>Use this temporary password to log in and change your password.</p>
                    <p>Best Regards,<br><strong>Saylani Welfare Team</strong></p>
                </div>
            </div>
        `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
  } catch (error) {
    throw new Error(error.message);
  }
};

export default sendMail;
