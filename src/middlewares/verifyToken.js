const jwt = require('jsonwebtoken');

const secretKey = 'upper-eat-sq';

function verifyToken(req, res, next) {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  console.log({token})
  if (!token) {
    return res.status(403).json({ message: 'No se proporcionó un token' });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    next(); 
  } catch (error) {
    res.status(401).json({ message: 'Token no válido o expirado' });
  }
}

module.exports = verifyToken;
