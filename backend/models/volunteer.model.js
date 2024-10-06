const mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/Hod")
.then(() => {
    console.log("mongodb connected");
})
.catch((error) => {
    console.error('Failed to connect to MongoDB:', error);
});

// Define the Volunteer Schema
const volunteerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensures the email is unique
  },
  phone: {
    type: Number,
    required: true,
  },
  interest: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  ssn: {
    type: String,
    required: true,
    unique: true, // Ensures the SSN is unique
  },
  dob: {
    type: Date,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});

// Create the Volunteer model
const Volunteer = mongoose.model('Volunteer', volunteerSchema);

module.exports = Volunteer;
