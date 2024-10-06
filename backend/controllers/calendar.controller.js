// controllers/eventController.js
const Event = require('../models/calendar.model');

// Add a new event
exports.addEvent = async (req, res) => {
  try {
    const { date, name, startDate, endDate, location } = req.body;
    const newEvent = new Event({ date, name, startDate, endDate, location });
    await newEvent.save();
    res.status(201).json({ message: 'Event added successfully', event: newEvent });
  } catch (error) {
    res.status(500).json({ message: 'Error adding event', error });
  }
};

// Get all events
exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving events', error });
  }
};
