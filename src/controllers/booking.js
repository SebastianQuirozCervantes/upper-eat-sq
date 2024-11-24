const bookingService = require('../services/booking');
const placeService = require('../services/place');

// Create new booking
exports.createBooking = async (req, res) => {
  const { numberOfPeople, placeId, date, hour } = req.body;
  
  try {
    if(!numberOfPeople || !placeId || !date || !hour){
      return res.status(400).json({code: 'NOT_ENOUGH_PARAMS', message: 'Some values ​​not received'})
    }
    const validatePlace = await placeService.getPlaceById(placeId)
    if(!validatePlace){
      return res.status(400).json({code: 'PLACE_NOT_EXIST', message: 'Some values are not correct'})
    }
    const newBooking = await bookingService.createBooking(req.body, req.user);
    res.status(201).json({
      code: 'BOOKING_CREATED',
      data: newBooking
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({code: 'BOOKING_ERROR', message: 'Error creating booking' });
  }
};

// Get bookings by user
exports.getBookings = async (req, res) => {
  try {
    const reservas = await bookingService.getBookings(req.user);
    res.status(200).json(reservas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener las reservas' });
  }
};

// Get a booking by ID
exports.getBookingById = async (req, res) => {
  const { id } = req.params;

  try {
    const reserva = await bookingService.getBookingById(id);
    if (!reserva) {
      return res.status(404).json({ message: 'Reserva no encontrada' });
    }
    res.status(200).json(reserva);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener la reserva' });
  }
};

exports.deleteBooking = async (req, res) => {
  const { id } = req.params;

  try {
    const booking = await bookingService.deleteBooking(id);
    res.status(200).json(booking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener la reserva' });
  }
};
 