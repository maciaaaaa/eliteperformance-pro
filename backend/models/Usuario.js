const db = require('../config/db');

class Usuario {
  // Busca al usuario por email para evitar duplicados
  static async obtenerPorEmail(email) {
    const query = 'SELECT * FROM usuarios WHERE email = $1';
    const { rows } = await db.query(query, [email]);
    return rows[0];
  }

  // IMPORTANTE: He cambiado "contraseña_hash" por "password_hash" 
  // para que coincida con lo que enviamos desde el Controller
  static async crear({ id, nombre, email, password_hash }) {
    const query = `
      INSERT INTO usuarios (id, nombre, email, password_hash)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;
    const values = [id, nombre, email, password_hash];
    const { rows } = await db.query(query, values);
    return rows[0];
  }
}

module.exports = Usuario;