const express = require('express');
const router = express.Router();
const volunteerController = require('../controllers/volunteer.controller'); // Adjust the path as needed

// Routes
router.post('/addvolunteer', volunteerController.createVolunteer);
router.get('/allvolunteers', volunteerController.getAllVolunteers);

module.exports = router;
