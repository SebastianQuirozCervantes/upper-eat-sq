const express = require('express');
const bookingController = require('../controllers/booking');

const router = express.Router();

// Create a new booking
router.post('/', bookingController.createBooking);

// Get all bookings by user
router.get('/', bookingController.getBookings);

// Get booking by id
router.get('/:id', bookingController.getBookingById);

router.delete('/:id', bookingController.deleteBooking)

module.exports = router;
