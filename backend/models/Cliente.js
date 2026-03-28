const db = require('../config/db');

class Cliente {
  // Crear un nuevo atleta asignado a un entrenador
  static async crear({ entrenador_id, nombre, email, plan }) {
    const query = `
      INSERT INTO clientes (id, entrenador_id, nombre, email, plan)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `;
    const id = Math.floor(Math.random() * 1000000);
    const values = [id, entrenador_id, nombre, email, plan || 'Básico'];
    const { rows } = await db.query(query, values);
    return rows[0];
  }

  // Obtener solo los clientes de UN entrenador específico
  static async obtenerPorEntrenador(entrenador_id) {
    const query = 'SELECT * FROM clientes WHERE entrenador_id = $1';
    const { rows } = await db.query(query, [entrenador_id]);
    return rows;
  }
}

module.exports = Cliente;