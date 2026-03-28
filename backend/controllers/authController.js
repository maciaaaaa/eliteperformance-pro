const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const { generarToken } = require('../utils/jwt'); // <--- NUEVA LÍNEA: Importamos la utilidad

// Función de Registro (Se queda igual, está perfecta)
async function registro(req, res) {
  try {
    const { email, nombre, contraseña } = req.body;
    
    const existe = await Usuario.obtenerPorEmail(email);
    if (existe) {
      return res.status(409).json({ error: 'Este email ya está registrado' });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHasheada = await bcrypt.hash(contraseña, salt);

    const usuarioNuevo = await Usuario.crear({
      id: Math.floor(Math.random() * 1000000),
      nombre: nombre,
      email: email,
      password_hash: passwordHasheada
    });

    res.status(201).json({ message: '✅ Registro exitoso', usuario: usuarioNuevo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al registrar', detail: error.message });
  }
}

// Función de Login (ACTUALIZADA con Token)
async function login(req, res) {
  try {
    const { email, contraseña } = req.body;
    const usuario = await Usuario.obtenerPorEmail(email);
    
    if (!usuario || !(await bcrypt.compare(contraseña, usuario.password_hash))) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    // 1. GENERAMOS EL TOKEN <--- NUEVA LÍNEA
    const token = generarToken(usuario.id, usuario.email, usuario.nombre);
    
    // 2. ENVIAMOS EL TOKEN AL CLIENTE <--- MODIFICADO
    res.status(200).json({ 
      message: '✅ Login exitoso', 
      token: token, // <--- Aquí enviamos la "llave"
      usuario: { id: usuario.id, nombre: usuario.nombre } 
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error en login' });
  }
}

module.exports = { registro, login };
