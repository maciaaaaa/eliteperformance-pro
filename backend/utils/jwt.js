const jwt = require('jsonwebtoken');

// Esta clave es como la "firma" de tu gimnasio. 
const JWT_SECRET = process.env.JWT_SECRET || 'clave_secreta_provisional_123';

function generarToken(id, email, nombre) {
  // Creamos un token que guarda quién eres y dura 24 horas
  return jwt.sign({ id, email, nombre }, JWT_SECRET, { expiresIn: '24h' });
}

module.exports = { generarToken };
