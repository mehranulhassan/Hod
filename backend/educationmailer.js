const nodemailer = require('nodemailer');

// Set up the transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'helpsondemand@gmail.com',
    pass: 'vxyv gflv dzln sjdr', // Replace with your App Password here
  },
});

// Function to send confirmation email
const sendConfirmationEmail = async (to, name, category) => {
  const mailOptions = {
    from: 'helpsondemand@gmail.com',
    to: to,
    subject: 'Thank You for Applying for a Scholarship! We Need More Information',
    text: `Dear ${name},\n\nThank you for applying for the ${category} scholarship! We are thrilled to consider you for this opportunity and would like to gather more information to proceed with the evaluation process.\n\nTo complete your application, please provide the following details:\n\n1. Your current education track (e.g., Bachelor's, Master's, PhD, etc.)\n2. The name of your university or educational institution\n3. Your tuition fee structure or estimate\n4. Any other relevant details or documents that might support your application\n\nPlease reply to this email with the requested information at your earliest convenience. If you have any questions or need assistance, feel free to contact us.\n\nWe appreciate your prompt response and look forward to reviewing your application in detail.\n\nBest regards,\nHelp on Demand Team`,
    html: `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <p>Dear ${name},</p>
        <p>Thank you for applying for the <strong>${category}</strong>! We are excited to consider you for this opportunity and need some additional details to proceed with the evaluation process.</p>
        <p>Please provide the following information to complete your application:</p>
        <ul>
          <li><strong>Your current education track</strong> (e.g., Bachelor's, Master's, PhD, etc.)</li>
          <li><strong>The name of your university or educational institution</strong></li>
          <li><strong>Your tuition fee structure or estimate</strong></li>
          <li><strong>Any other relevant details or documents</strong> that might support your application</li>
        </ul>
        <p>We kindly ask you to reply to this email with the requested information at your earliest convenience. If you have any questions or need further assistance, please do not hesitate to reach out to us.</p>
        <p>
          <a href="https://www.hod.us.org" target="_blank" style="color: #007bff; text-decoration: none;">Visit our website</a> to learn more about our programs and how you can get involved further.
        </p>
        <p>We appreciate your prompt response and look forward to reviewing your application in detail!</p>
        <p>Best regards,<br>Help on Demand Team</p>
      </div>
    `,
    attachments: [
      {
        filename: 'logo.png',
        path: './images/logo.png',
        cid: 'logo', // same as the cid in the `img` tag
      },
    ],
  };

  // Send the email using Nodemailer
  try {
    await transporter.sendMail(mailOptions);
    console.log('Confirmation email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

module.exports = { sendConfirmationEmail };
