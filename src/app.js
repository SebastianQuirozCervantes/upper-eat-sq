const express = require('express');
const dotenv = require('dotenv');
const bookingRoutes = require('./routes/booking');
const authRoutes = require('./routes/auth');
const placeRoutes = require('./routes/place');
const generalRoutes = require('./routes/general');
const cors = require('cors');
const verifyToken = require('./middlewares/verifyToken');
const app = express();

// Load env vars
dotenv.config();
const corsOptions = {
    origin: 'https://upper-eat-sq-next.onrender.com', // Cambia a la URL de tu frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'], // Incluye el token en 'Authorization'
  };
  app.use(cors(corsOptions));
// Middleware to handle JSON request
app.use(express.json());

// Routes
app.use('/api/place', verifyToken, placeRoutes);
app.use('/api/booking', verifyToken, bookingRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/general', verifyToken, generalRoutes);

module.exports = app;
