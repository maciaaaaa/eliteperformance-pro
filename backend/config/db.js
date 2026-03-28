const { Pool } = require('pg');
require('dotenv').config();

// Creamos la conexión usando la URL de Railway que tienes en tu .env
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false // Esto es OBLIGATORIO para que Railway te deje entrar
  }
});

// Esto es lo que faltaba: exportar la función "query" para que Usuario.js pueda usarla
module.exports = {
  query: (text, params) => pool.query(text, params),
};