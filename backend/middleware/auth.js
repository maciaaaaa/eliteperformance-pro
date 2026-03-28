const jwt = require('jsonwebtoken');

function verificarAutenticacion(req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'No autorizado, falta el token' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'clave_secreta_provisional_123');
    req.usuario = decoded; // Guardamos los datos del entrenador para usarlos luego
    next();
  } catch (error) {
    res.status(403).json({ error: 'Token inválido o expirado' });
  }
}

module.exports = { verificarAutenticacion };
