const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');
const { verificarAutenticacion } = require('../middleware/auth');

// Rutas protegidas
router.post('/', verificarAutenticacion, clienteController.crearCliente);
router.get('/', verificarAutenticacion, clienteController.obtenerMisClientes);

module.exports = router;