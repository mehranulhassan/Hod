// src/routes/scholarshipRoutes.js

const express = require('express');
const router = express.Router();
const { createScholarshipApplication } = require('../controllers/education.controller');

// Route to handle scholarship application form submissions
router.post('/apply', createScholarshipApplication);

module.exports = router;
