const express = require('express');
const generalController = require('../controllers/general');

const router = express.Router();

// Get all bookings by user
router.get('/dashboard', generalController.getDashboardData);

module.exports = router;
