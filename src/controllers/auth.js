// src/controllers/authController.js
const authService = require('../services/auth');

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await authService.login(email, password);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.register = async (req, res) => {
    try {
        await authService.register(req.body);
        res.status(201).json({ code: 'USER_REGISTERED', message: 'Successfully registered user' });
    } catch (error) {
      res.status(500).json({ message: 'Error al registrar el usuario', error: error.message });
    }
  };