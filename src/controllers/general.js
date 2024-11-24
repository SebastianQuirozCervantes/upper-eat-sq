const bookingService = require('../services/booking');
const placeService = require('../services/place');

// Get bookings by user
exports.getDashboardData = async (req, res) => {
  try {
    const places = await placeService.getPlacesCount();
    const myBookings = await bookingService.getMyBookingsCount(req.user);
    const users = await bookingService.getUsersCount();
    res.status(200).json({
        places,
        myBookings,
        users
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener las reservas' });
  }
};
