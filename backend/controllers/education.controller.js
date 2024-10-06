const ScholarshipApplication = require('../models/education.model');
const { sendConfirmationEmail } = require('../educationmailer');

// Controller function to create a new scholarship application
const createScholarshipApplication = async (req, res) => {
  try {
    const { category, name, email, phone } = req.body;

    // Validate required fields
    if (!category || !name || !email || !phone) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Create a new scholarship application
    const newApplication = new ScholarshipApplication({
      category,
      name,
      email,
      phone,
    });

    // Save the application to the database
    await newApplication.save();

    // Attempt to send the confirmation email
    try {
      await sendConfirmationEmail(email, name, category);
    } catch (emailError) {
      console.error('Error sending confirmation email:', emailError);
      // Continue processing despite email error
    }

    // Send success response
    res.status(201).json({ message: 'Application submitted successfully', application: newApplication });
  } catch (error) {
    console.error('Error creating scholarship application:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

module.exports = {
  createScholarshipApplication,
};
