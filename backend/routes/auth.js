const express = require('express');
const router = express.Router();
const { registro, login } = require('../controllers/authController');

// RUTA POST /api/auth/registro
router.post('/registro', registro);

// RUTA POST /api/auth/login
router.post('/login', login);

module.exports = router;