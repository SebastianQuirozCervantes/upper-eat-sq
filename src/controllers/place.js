const placeService = require('../services/place');

exports.register = async (req, res) => {
    try {
        await placeService.register(req.body);
        res.status(201).json({ code: 'PLACE_REGISTERED', message: 'Successfully registered place' });
    } catch (error) {
      res.status(500).json({ code: 'PLACE_UNREGISTERED', message: 'Error registering place', error: error.message });
    }
  };

exports.getPlaces = async(req, res) => {
  try {
      const places = await placeService.getPlaces(req.user);
      res.status(200).json(places);
  } catch (error) {
    res.status(500).json({ code: 'PLACES_NOT_FOUND', message: 'Error getting places', error: error.message });
  }
}