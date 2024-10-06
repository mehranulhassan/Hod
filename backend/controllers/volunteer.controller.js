const Volunteer = require('../models/volunteer.model');
const { sendConfirmationEmail } = require('../mailer');

// Create a new volunteer
exports.createVolunteer = async (req, res) => {
  try {
    const { name, email, phone, interest, image, ssn, dob, address } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !interest || !image || !ssn || !dob || !address) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    // Check if the volunteer already exists
    const existingVolunteer = await Volunteer.findOne({ email });
    if (existingVolunteer) {
      return res.status(400).json({ success: false, message: 'Volunteer with this email already exists' });
    }

    // Create a new volunteer
    const volunteer = new Volunteer({
      name,
      email,
      phone,
      interest,
      image,
      ssn,
      dob,
      address,
    });

    // Save the volunteer
    await volunteer.save();
    
    // Send confirmation email
    await sendConfirmationEmail(email, name, 'Thank you for volunteering');

    // Send success response
    res.status(201).json({ success: true, volunteer });
  } catch (error) {
    console.error('Error creating volunteer:', error);
    res.status(500).json({ success: false, message: 'Error creating volunteer', error: error.message });
  }
};

// Get all volunteers
exports.getAllVolunteers = async (req, res) => {
  try {
    const volunteers = await Volunteer.find({});
    res.status(200).json({ success: true, volunteers });
  } catch (error) {
    console.error('Error fetching volunteers:', error);
    res.status(500).json({ success: false, message: 'Error fetching volunteers', error: error.message });
  }
};
