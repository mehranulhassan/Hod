// routes/eventRoutes.js
const express = require('express');
const router = express.Router();
const eventController = require('../controllers/calendar.controller');

router.post('/add', eventController.addEvent);
router.get('/events', eventController.getAllEvents);

module.exports = router;
