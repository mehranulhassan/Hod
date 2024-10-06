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
const sendConfirmationEmail = async (to, name) => {
  const mailOptions = {
    from: 'helpsondemand@gmail.com',
    to,
    subject: 'Thank You for Volunteering!',
    text: `Dear ${name},\n\nThank you for signing up as a volunteer! We are thrilled to have you on board. Your support will make a significant impact on our community efforts.\n\nWe would love to stay in touch with you. Visit our website at www.hod.us.org to learn more about our programs and events.\n\nBest regards,\nHelp on Demand Team`,
    html: `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <p>Dear ${name},</p>
        <p>Thank you for signing up as a volunteer! We are thrilled to have you on board. Your support will make a significant impact on our community efforts.</p>
        <p>
          We believe in the power of community, and with volunteers like you, we can make a real difference. We encourage you to stay engaged with our ongoing projects and events.
        </p>
        <p>
          <a href="https://www.hod.us.org" target="_blank" style="color: #007bff; text-decoration: none;">Visit our website</a> to learn more about our programs and how you can get involved further.
        </p>
        <p>Below is a picture capturing one of our recent community events where volunteers made a huge difference:</p>
        <img src="cid:logo" alt="Community Event" style="max-width: 100%; height: auto;"/>
        <p>We look forward to working together and achieving great things for our community!</p>
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
