const Cliente = require('../models/Cliente');

async function crearCliente(req, res) {
  try {
    const { nombre, email, plan } = req.body;
    
    // IMPORTANTE: Sacamos el ID del entrenador del TOKEN (req.usuario.id)
    const entrenador_id = req.usuario.id; 

    const nuevoCliente = await Cliente.crear({
      entrenador_id,
      nombre,
      email,
      plan
    });

    res.status(201).json({ message: '✅ Atleta registrado', cliente: nuevoCliente });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear cliente', detail: error.message });
  }
}

async function obtenerMisClientes(req, res) {
  try {
    const entrenador_id = req.usuario.id;
    const clientes = await Cliente.obtenerPorEntrenador(entrenador_id);
    res.status(200).json(clientes);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener clientes' });
  }
}

module.exports = { crearCliente, obtenerMisClientes };
